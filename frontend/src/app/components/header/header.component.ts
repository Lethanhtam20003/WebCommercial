import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouteLink } from './../../constant/route-link';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { LabelConstants } from '../../constant/label.constants';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		// NgIf,
		FormsModule,
		RouterLink,
		ReactiveFormsModule,
		InputTextModule,
		ButtonModule,
	],
	// template: `
	// 	<p>
	//     hearder works!
	//     <button (click)="loginWithFacebook()">Login with Facebook </button>
	//   </p>
	// <ng-container *ngIf="user as u">
	//   <p>
	//     <strong>User Info:</strong><br />
	//     ID: {{ u.id }}<br />
	//     Name: {{ u.name }}<br />
	//     Email: {{ u.email }}<br />
	//     Profile Picture: <img [src]="u.photoUrl" alt="Profile Picture" /><br />
	//     Auth Token: {{ u.authToken }}<br />
	//     First Name: {{ u.firstName }}<br />
	//     Last Name: {{ u.lastName }}<br />
	//   </p>
	// </ng-container>
	// `,
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss', './headers.scss'],
})
export class HeaderComponent implements OnInit {
	// user?: SocialUser;
	// constructor(private authService: SocialAuthService, private http: HttpClient) {}
	// loginWithFacebook(): void {
	//   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
	//     this.user = userData;
	//     console.log('Facebook User:', this.user);
	//     this.http.post('http://localhost:8080/api/v1/auth/facebook', { accessToken: this.user.authToken })
	//       .subscribe(response => {
	//         console.log('Backend response:', response);
	//       });
	//   });
	// }

	/**
	 * @var logo2: logo for clicking it to turn to home page
	 */
  constructor(private fb:FormBuilder){}
	logo2: string = 'assets/images/shop/logo2.png';
	searchForm!: FormGroup;
	ngOnInit(): void {
		this.searchForm = this.fb.group({
      searchInput: ['']
    });
	}

	protected readonly route = RouteLink;
	protected readonly label = LabelConstants;
}
