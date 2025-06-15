import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, Subject, takeUntil } from 'rxjs';
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
	protected isPressed = {
		myAccount: false,
		admin: false,
		logout: false,
	};
	logo: string = 'assets/images/shop/logo.png';
	searchForm!: FormGroup;
	protected readonly route = RouteLink;
	protected readonly label = LabelConstants;
	isLoggedIn$!: Observable<boolean>;
	private destroy$ = new Subject<void>();
	protected user$!: Observable<UserProfile | null>;
	protected isAdmin$!: Observable<boolean>;
	protected user: UserProfile | null = null;

	constructor(
		private fb: FormBuilder,
		// private http: HttpClient,
		private router: Router,
		private authService: AuthService,
		private userStateService: UserStateService
	) {}

	ngOnInit(): void {
		this.searchForm = this.fb.group({
			searchInput: [''],
		});
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.user$ = this.userStateService.user$;
    this.userStateService.fetchUserInfo();

		this.isAdmin$ = this.user$.pipe(
			map(user => user?.role === 'ADMIN'),
      distinctUntilChanged(),
			filter(Boolean)
		);

		this.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
			this.user = user;
		});

		this.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe(isAdmin => {
			console.log(`Is admin: ${isAdmin}`);
		});
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

	onPress(button: keyof typeof this.isPressed): void {
		this.isPressed[button] = true;
	}

	onRelease(button: keyof typeof this.isPressed): void {
		this.isPressed[button] = false;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
