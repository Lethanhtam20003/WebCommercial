import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { AuthenticationResponse } from '../models/authentication-response.model';
import { authenticatedResponse } from '../models/authenticated_response.model';
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
      this.checkauth().subscribe();
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

  /**
   * Kiểm tra xác thực người dùng
   * @returns Observable<boolean>
   */
  checkauth(): Observable<boolean> {
    const token = this.getStoredToken();
    if (!token) {
      this.updateLoginStatus(false);
      return of(false);
    }

    return this.http.get<ApiResponse<authenticatedResponse>>(URL_API.checkAuthUrl)
      .pipe(
        switchMap(res => {
          const isAuthenticated = res.code === 200;
          if (isAuthenticated && !res.result.auth) {
            return this.handleTokenRefresh();
          }
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
  private handleTokenRefresh(): Observable<boolean> {
    const token = this.getStoredToken();
    if (!token) {
      return of(false);
    }

    return this.http.post<ApiResponse<AuthenticationResponse>>(
      URL_API.refreshTokenUrl,
      { token }
    ).pipe(
      map(res => {
        const isSuccess = res.code === 200;
        if (isSuccess) {
          localStorage.setItem(this.TOKEN_KEY, res.result.access_token);
          this.updateLoginStatus(true);
        } else {
          this.updateLoginStatus(false);
        }
        return isSuccess;
      }),
      catchError(() => {
        this.updateLoginStatus(false);
        return of(false);
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
