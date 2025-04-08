import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule],
  template: `
    <p>
      hearder works!
      <button (click)="loginWithFacebook()">Login with Facebook </button>
    </p>
    
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor( private http: HttpClient, private router: Router) {}

  // loginWithFacebook(): void {
  //   window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
  // }

  loginWithFacebook(): void {
  const popup = window.open(
    'http://localhost:8080/api/oauth2/authorization/facebook',
    '_blank',
    'width=600,height=700'
  );

  window.addEventListener('message', (event) => {
    if (event.origin !== 'http://localhost:8080') return;
    // Kiểm tra xem sự kiện có chứa dữ liệu không
    const response = event.data;
    console.log(response)
    if (response?.result?.token) {
      console.log('Token:');
      alert(response);
      localStorage.setItem('access_token', response.result.token);
      // bạn có thể thêm user service hoặc state để lưu user

      this.router.navigate(['/dashboard']);
    } else {
      console.error('Không nhận được token!');
    }
  }, { once: true }); // chỉ nghe 1 lần
}

  
}
