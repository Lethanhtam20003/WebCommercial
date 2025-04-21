import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { RouteLink } from '../../shared/constant/route-link';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    
    return (this.auth.checkauth() || of(false)).pipe(
      map((res) => {
        if (res) {
          return true;
        } else {
          this.router.navigate([RouteLink.loginRoute]);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate([RouteLink.loginRoute]);
        return of(false);
      })
    );
  }
}
