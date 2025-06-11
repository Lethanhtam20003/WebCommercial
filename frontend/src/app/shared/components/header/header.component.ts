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
import { LabelConstants } from '../../../shared/constants/label.constants';
import { RouteLink } from '../../../shared/constants/route-link';
import { AuthService } from '../../../core/service/auth.service';
import { UserStateService } from '../../../core/service/state/user-state.service';
import { UserProfile } from '../../../core/models/response/user/user-profile-response.model';
import { Role } from '../../../core/enum/role.enum';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	protected isMyAccountPressed: boolean = false;
	protected isLogoutPressed: boolean = false;
	protected isAdminPressed: boolean = false;
	logo: string = 'assets/images/shop/logo.png';
	searchForm!: FormGroup;
	protected readonly route = RouteLink;
	protected readonly label = LabelConstants;
	isLoggedIn$: Observable<boolean>;
	private user$: Observable<UserProfile | null>;
	protected isAdmin: boolean = false;
	protected user: UserProfile | null = null;

	constructor(
		private fb: FormBuilder,
		// private http: HttpClient,
		private router: Router,
		private authService: AuthService,
		private userStateService: UserStateService
	) {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.user$ = this.userStateService.user$;
	}

	ngOnInit(): void {
		this.searchForm = this.fb.group({
			searchInput: [''],
		});

		/** Load user info from session or API on init */
		this.userStateService.loadUserFromStorageOrAPI();

		/** Theo dõi user và cập nhật biến user, isAdmin */
		this.user$.subscribe(user => {
			this.user = user;
			this.isAdmin = !!user?.role.includes(Role.ADMIN);
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
		this.authService.isLoggedIn$.subscribe(isLoggedIn => {
			console.log('isLoggedIn:', isLoggedIn);
		});
		console.log('Logout');
		this.authService.logout();
		this.router.navigate(['/log-in']);
	}

	logg(): void {
		this.authService.isLoggedIn$.subscribe(isLoggedIn => {
			console.log('isLoggedIn:', isLoggedIn);
		});
	}


	onPress(button: 'myAccount' | 'admin' | 'logout'): void {
		if (button === 'myAccount') {
			this.isMyAccountPressed = true;
		} else if (button === 'admin') {
			this.isAdminPressed = true;
    } else if (button === 'logout') {
      this.isLogoutPressed = true;
    }
	}

	onRelease(button: 'myAccount' | 'admin' | 'logout'): void {
		if (button === 'myAccount') {
			this.isMyAccountPressed = false;
		} else if (button === 'admin') {
			this.isAdminPressed = false;
    } else if (button === 'logout') {
      this.isLogoutPressed = false;
    }
	}
}
