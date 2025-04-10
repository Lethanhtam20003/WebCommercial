import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterModule],
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

  loginWithFacebook(): void {
    window.location.href = 'http://localhost:8080/api/oauth2/authorization/facebook';
  }
}


