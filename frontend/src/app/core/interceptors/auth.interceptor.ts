import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

// This interceptor adds the withCredentials flag to all HTTP requests 
// ( thêm cờ withCredentials vào tất cả các yêu cầu HTTP )

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('skipAuth')) {
      return next.handle(req);
    }
    const token = localStorage.getItem('access_token');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
         
        }
      });
      console.log('intercepter:',cloned);
      return next.handle(cloned);
    }
    // If there's no token, just pass the request through without modification
    // Nếu không có token, chỉ cần truyền yêu cầu mà không sửa đổi
    return next.handle(req);
  }
}