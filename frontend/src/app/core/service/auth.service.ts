import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { AuthenticationResponse } from '../models/authentication-response.model';
import { IntrospectResponse } from '../models/introspect_response.model';
import { URL_API } from '../constants/url-api.constants';
import { LabelConstants } from '../constants/label.constants';
import { ErrorMessageConstants } from '../constants/error-message.constants';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Kiểm tra trạng thái đăng nhập khi service được khởi tạo
    // this.checkInitialAuthState();
  }

  /**
   * Kiểm tra trạng thái đăng nhập ban đầu
   * @private
   */
  private checkInitialAuthState(): void {
    const token = this.getStoredToken();
    if (token) {
      this.verifyAuthentication().subscribe();
    }
  }

  /**
   * Lấy token từ localStorage
   * @private
   */
  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Cập nhật trạng thái đăng nhập
   * @param status - Trạng thái đăng nhập mới
   * @private
   */
  private updateLoginStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  /**
   * Kiểm tra xác thực người dùng
   * @returns Observable<boolean>
   */
  verifyAuthentication(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      take(1), //  chỉ nhận 1 giá trị duy nhất
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(true); // Đã đăng nhập, không cần kiểm tra lại
        } else {
          // Return false if not logged in
          return this.validateToken();
        }
      })
    );
  }

  validateToken(): Observable<boolean> {
    // Kiểm tra xem token có tồn tại không
    const token = this.getStoredToken();
    if (!token) {
      this.updateLoginStatus(false);
      return of(false);
    }

    const body = {
      token: token
    };

    return this.http.post<ApiResponse<IntrospectResponse>>(
      URL_API.introspect,
      body, {
        headers : new HttpHeaders().set('skipAuth', 'true'),
    })
    .pipe(
      switchMap(res => {
        if(res.code === 200){
          const isAuthenticated = res.result.isValid ;
          this.updateLoginStatus(isAuthenticated);
          return of(true);
        }
        // if (isAuthenticated && !res.result.isValid) {
        //   return this.handleTokenRefresh();
        // }

        return of(false);
      }),
      catchError(() => {
        this.updateLoginStatus(false);
        return of(false);
      })
    );
  }



  /**
   * Xử lý làm mới token
   * @returns Observable<boolean>
   * @private
   */
  // private handleTokenRefresh(): Observable<boolean> {
  //   const token = this.getStoredToken();
  //   if (!token) {
  //     return of(false);
  //   }

  //   return this.http.post<ApiResponse<AuthenticationResponse>>(
  //     URL_API.refreshTokenUrl,
  //     { token }
  //   ).pipe(
  //     map(res => {
  //       const isSuccess = res.code === 200;
  //       if (isSuccess) {
  //         localStorage.setItem(this.TOKEN_KEY, res.result.access_token);
  //         this.updateLoginStatus(true);
  //       } else {
  //         this.updateLoginStatus(false);
  //       }
  //       return isSuccess;
  //     }),
  //     catchError(() => {
  //       this.updateLoginStatus(false);
  //       return of(false);
  //     })
  //   );
  // }

  /**
   * Đăng nhập bằng Facebook
   */
  loginWithFacebook(): void {
    // Tính toán vị trí để popup hiển thị giữa màn hình
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      URL_API.facebookLogin,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }
  register(username: string, emailOrPhone: string, password: string): Observable<ApiResponse<AuthenticationResponse>> {
    const email = emailOrPhone.includes('@') ? emailOrPhone : null;
    const phone = emailOrPhone.includes('@') ? null : emailOrPhone;

    const body = {
      username,
      email,
      phone,
      password
    };

    return this.http.post<ApiResponse<AuthenticationResponse>>(
      URL_API.registerUrl,
      body,
      {
        headers: new HttpHeaders().set('skipAuth', 'true'),
      }
    ).pipe(
      tap(res => {

      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred during registration:', error);
        this.updateLoginStatus(false);
        let errorMessage = ErrorMessageConstants.UnknownErrorOccurred;

        if (error.error?.message === 'user existed') {
          errorMessage = ErrorMessageConstants.userExisted;
        }
        if (error.error?.message === 'email existed') {
          errorMessage = ErrorMessageConstants.emailExisted;
        }
        if (error.error?.message === 'phone existed') {
          errorMessage = ErrorMessageConstants.phoneExisted;
        }
        return of({
          code: error.error?.code || 500,
          message: errorMessage,
          result: { token: '' } as AuthenticationResponse
        });
      })
    );
  }


  login(username: string, password: string): Observable<ApiResponse<AuthenticationResponse>> {
    const body = {
      username,
      password
    };

    return this.http.post<ApiResponse<AuthenticationResponse>>(
      URL_API.loginUrl,
      body,{
        headers : new HttpHeaders().set('skipAuth', 'true'),
      }
    ).pipe(
      tap(res => {
        if (res.code === 200) {
          console.log('Log2');
          localStorage.setItem(this.TOKEN_KEY, res.result.token);
          this.updateLoginStatus(true);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.updateLoginStatus(false);
        let errorMessage = ErrorMessageConstants.UnknownErrorOccurred;
        if(error.error.message === 'user not existed') {
          errorMessage = ErrorMessageConstants.userNotExisted;
        }if(          error.error.message === 'password not correct') {
          errorMessage = ErrorMessageConstants.passwordNotCorrect;
        }
        return of({
          code: error.error.code,
          message: errorMessage,
          result: {token: '' } as AuthenticationResponse
        });
      })
    );
  }

  /**
   * Đăng xuất
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.updateLoginStatus(false);
  }
}


