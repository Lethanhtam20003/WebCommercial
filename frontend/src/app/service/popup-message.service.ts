import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { URL_API } from '../constant/url-api.constants';
import {  Router } from '@angular/router'; 
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupMessageService {
  private tokenReceivedSubject = new Subject<string>();
  tokenReceived$ = this.tokenReceivedSubject.asObservable();

  constructor(private router: Router, private ngZone: NgZone) { }

  listenForToken() {
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== URL_API.facebookLogin) 
        return;
      const token = event.data?.token;
      if (token) {
        this.ngZone.run(() => {
          localStorage.setItem('access_token', token);
          this.tokenReceivedSubject.next(token);
          this.router.navigate(['/']);
        });
          // Optional: Gỡ listener để tránh leak
          window.removeEventListener('message', messageListener);
      }
      window.addEventListener('message', messageListener);
    }
  }
}

