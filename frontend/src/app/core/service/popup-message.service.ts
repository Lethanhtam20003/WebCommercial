import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { URL_API } from '../constants/url-api.constants';
import {  Router } from '@angular/router'; 
import { NgZone } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Service xử lý nhận token từ popup OAuth
 * @class PopupMessageService
 */
@Injectable({
  providedIn: 'root'
})
export class PopupMessageService {
  /**
   * Subject để phát tín hiệu khi nhận được token
   * @private
   */

  /**
   * Observable để components có thể subscribe và nhận token
   */

  constructor(private router: Router, private ngZone: NgZone,private authservice: AuthService) { }

  /**
   * Lắng nghe và xử lý token từ popup OAuth
   * @returns {Function} Hàm cleanup để remove event listener
   */
  listenForToken(): () => void {
    const messageListener = (event: MessageEvent) => {
      // Kiểm tra origin để đảm bảo message đến từ nguồn tin cậy
      if (event.origin !== URL_API.originUrl) {
        return;
      }

      // Kiểm tra và xử lý token từ message data
      const token = event.data?.token;
      if (token) {
        // Sử dụng NgZone để đảm bảo các thao tác được thực hiện trong Angular zone
        this.ngZone.run(() => {

          // Phát tín hiệu token đã được nhận
          this.authservice.loginWithToken(token);
          
          // Điều hướng về trang chủ sau khi nhận token
          this.router.navigate(['/']);
        });
        
        // Gỡ bỏ event listener sau khi đã xử lý token
        window.removeEventListener('message', messageListener);
      }
    };

    // Đăng ký lắng nghe message events
    window.addEventListener('message', messageListener);

    /**
     * Trả về hàm cleanup để component có thể gỡ bỏ listener
     * khi không cần thiết hoặc khi component bị destroy
     */
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }
}

