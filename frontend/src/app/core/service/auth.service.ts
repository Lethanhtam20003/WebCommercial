import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { AuthenticationResponse } from '../models/authentication-response.model';
import { IntrospectResponse } from '../models/introspect_response.model';
import { URL_API } from '../constants/url-api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Kiểm tra trạng thái đăng nhập khi service được khởi tạo
    this.checkInitialAuthState();
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
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          console.log('isloggin',isLoggedIn)
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
          return of(false);
        }
        const isAuthenticated = res.result.isValid ;
        // if (isAuthenticated && !res.result.isValid) {
        //   return this.handleTokenRefresh();
        // }
        
        this.updateLoginStatus(isAuthenticated);
        return of(isAuthenticated);
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

  login(username: string, password: string): Observable<ApiResponse<AuthenticationResponse>> {
    const body = {
      username,
      password
    };

    return this.http.post<ApiResponse<AuthenticationResponse>>(
      URL_API.loginUrl,
      body
    ).pipe(
      tap(res => {
        if (res.code === 200) {
          localStorage.setItem(this.TOKEN_KEY, res.result.token);
          this.updateLoginStatus(true);
        } else {
          this.updateLoginStatus(false);
        }
      }),
      catchError(() => {
        this.updateLoginStatus(false);
        return of({
          code: 500,
          message: 'Đăng nhập thất bại',
          result: { token: '' } as AuthenticationResponse
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
