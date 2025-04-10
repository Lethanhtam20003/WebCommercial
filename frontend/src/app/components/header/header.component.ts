import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  template: `
    <p>
      hearder works!
      <button (click)="loginWithFacebook()">Login with Facebook </button>
    </p>
  <ng-container *ngIf="user as u">
    <p>
      <strong>User Info:</strong><br />
      ID: {{ u.id }}<br />
      Name: {{ u.name }}<br />
      Email: {{ u.email }}<br />
      Profile Picture: <img [src]="u.photoUrl" alt="Profile Picture" /><br />
      Auth Token: {{ u.authToken }}<br />
      First Name: {{ u.firstName }}<br />
      Last Name: {{ u.lastName }}<br />
    </p>
  </ng-container>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user?: SocialUser;

  constructor(private authService: SocialAuthService, private http: HttpClient) {}

  loginWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
      this.user = userData;
      console.log('Facebook User:', this.user);
      
      this.http.post('http://localhost:8080/api/v1/auth/facebook', { accessToken: this.user.authToken })
        .subscribe(response => {
          console.log('Backend response:', response);
        });
    });
  }

}
