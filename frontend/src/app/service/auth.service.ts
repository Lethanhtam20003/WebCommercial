import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);
  private role = new BehaviorSubject<string | null>(null);

  // Dùng để các component subscribe
  isLoggedIn$ = this.loggedIn.asObservable();
  username$ = this.username.asObservable();
  role$ = this.role.asObservable();

  setUserInfo(username: string, role: string) {
    this.loggedIn.next(true);
    this.username.next(username);
    this.role.next(role);
  }

  clearUserInfo() {
    this.loggedIn.next(false);
    this.username.next(null);
    this.role.next(null);
  }
}
