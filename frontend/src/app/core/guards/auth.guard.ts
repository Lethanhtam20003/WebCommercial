import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { RouteLink } from '../../shared/constants/route-link';
import { map, catchError, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Kiểm tra quyền truy cập route
   * @returns Observable<boolean> - true nếu được phép truy cập, false nếu không
   */
  canActivate(): Observable<boolean> {
    // Đầu tiên kiểm tra trạng thái đăng nhập hiện tại
    return this.authService.isLoggedIn$.pipe(
      take(1), // Chỉ lấy giá trị hiện tại
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(true); // Đã đăng nhập, cho phép truy cập
        }
        
        // Nếu chưa đăng nhập, kiểm tra token và xác thực
        return this.checkAuthentication();
      }),
      catchError(() => {
        this.handleUnauthorized();
        return of(false);
      })
    );
  }

  /**
   * Kiểm tra xác thực người dùng
   * @private
   * @returns Observable<boolean>
   */
  private checkAuthentication(): Observable<boolean> {
    return this.authService.verifyAuthentication().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        this.handleUnauthorized();
        return false;
      }),
      catchError(() => {
        this.handleUnauthorized();
        return of(false);
      })
    );
  }

  /**
   * Xử lý khi người dùng chưa được xác thực
   * @private
   */
  private handleUnauthorized(): void {
    this.router.navigate([RouteLink.loginRoute], {
      queryParams: { returnUrl: this.router.url }
    });
  }
}
