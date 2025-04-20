import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RouteLink } from '../constant/route-link';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root',
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
