import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LabelConstants } from '../../../core/constants/label.constants';
import { RouteLink } from '../../../core/constants/route-link';
import { AuthService } from '../../../core/service/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss', './header.scss'],
})
export class HeaderComponent implements OnInit {
	logo: string = 'assets/images/shop/logo.png';
	searchForm!: FormGroup;
	protected readonly route = RouteLink;
	protected readonly label = LabelConstants;
	isLoggedIn$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		// private http: HttpClient,
		private router: Router,
		private authService: AuthService
	) {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
	}

	ngOnInit(): void {
		this.searchForm = this.fb.group({
			searchInput: [''],
		});

		// this.authService.isLoggedIn$.subscribe(loggedIn => {
		// 	this.isLoggedIn = loggedIn;
		// });
	}

	/**
	 * @description: navigation while in home page, or else reload the page if stay in home page
	 */
	goHome(): void {
		if (this.router.url === this.route.homeRoute || this.router.url === '/') {
			location.reload();
		} else {
			this.router.navigate([this.route.homeRoute]);
		}
	}

	onSearch(): void {
		const keyword = this.searchForm.value.searchInput?.trim();
		if (keyword) {
			this.router.navigate(['/search'], { queryParams: { q: keyword } });
		}
	}
	/**
	 * @description: logout
	 */
	logout(): void {
		// log isloggedIn$
		this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
			console.log('isLoggedIn:', isLoggedIn);
		});
		console.log('Logout');
		this.authService.logout();
    	this.router.navigate(['/log-in']);
	}
	logg(): void{
		this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
			console.log('isLoggedIn:', isLoggedIn);
		});
	}

}
