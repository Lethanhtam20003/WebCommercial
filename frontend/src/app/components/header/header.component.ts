import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouteLink } from './../../constant/route-link';
import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { LabelConstants } from '../../constant/label.constants';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { Select } from 'primeng/select';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		// NgIf,
		FormsModule,
		RouterLink,
		RouterLinkActive,
		ReactiveFormsModule,
		InputTextModule,
		Select,
	],
	template: `
		<!-- <p>
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
  </ng-container> -->
		<header>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div>
						<div class="mb-4">
							<!-- Logo & Description -->
							<a routerLink="/{{ route.homeRoute }}" routerLinkActive="active">
								<img
									[src]="logo2"
									alt="#"
									class="h-auto"
									width="120"
									height="35"
								/>
							</a>
						</div>
					</div>
					<div>
						<div class="card flex justify-content-center">
							<form action="" [formGroup]="searchMethodFormGroup">
								<p-select
									[options]="methods"
									formControlName="selectedMethod"
									optionLabel="name"
									placeholder="{{ label.searchMethod }}"
									class="min-w-s max-w-3xs"
								/>
								<input
									type="text"
									pInputText
									formControlName="keywords"
									placeholder="{{ label.searchProductHere }}"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</header>
	`,
	styles: `
		input[pInputText],
		p-select {
			border-radius: 0 !important;
		}
		// :host ::ng-deep .p-inputtext:hover,
		// :host ::ng-deep .p-inputtext:focus,
		// :host ::ng-deep .p-select.p-focus,
		// :host ::ng-deep .p-select:hover,
		// :host ::ng-deep .p-select:focus {
		// 	border-color: inherit !important;
		// 	box-shadow: none !important;
		// 	outline: none !important;
		// }
	`,
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
	 * @var methods: search method to apply for searching product
	 * @var selectedMethod: method is selelcted to search product
	 * @var searchMethodFormGroup: form for controling fields inside form
	 */
	logo2: string = 'assets/images/shop/logo2.png';
	methods: searchMethod[] | undefined;
	selectedMethod: searchMethod | undefined;
	searchMethodFormGroup!: FormGroup;

	/**
	 * @description method when the component is initialized
	 */
	ngOnInit(): void {
		this.methods = [
			{ name: 'Danh mục', id: 1 },
			{ name: 'Tên', id: 2 },
			{ name: 'Mô tả', id: 3 },
		];

		/**
		 * @description assign value to searchMethodFormGroup variable
		 */
		this.searchMethodFormGroup = new FormGroup({
			keywords: new FormControl<string>(''),
			selectedMethod: new FormControl<searchMethod>(this.methods[0]),
		});
	}

	/**
	 * @var route: variable to get route link is declared as variable
	 * @var label: variable to get label is declared as variable
	 */
	protected readonly route = RouteLink;
	protected readonly label = LabelConstants;
}

/**
 * @interface searchMethod: have two variable is name and id
 */
interface searchMethod {
	name: string;
	id: number;
}
