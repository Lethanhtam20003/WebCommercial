import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
interface IntrospectResponse {
  valid: boolean;
}

interface ApiResponse<T> {
  result: T;
}
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    return this.http.get<ApiResponse<IntrospectResponse>>(
      'http://localhost:8080/api/v1/auth/check-auth',
      { withCredentials: true }
    ).pipe(
      map((res) => {
        if (res.result.valid) {
          
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
}
}
