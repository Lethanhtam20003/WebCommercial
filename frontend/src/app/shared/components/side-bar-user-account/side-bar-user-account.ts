import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { UserProfile } from '../../../core/models/response/user/user-profile-response.model';
import { AlertService } from '../../../core/service/alert.service';
import { UserStateService } from '../../../core/service/state/user-state.service';
import { UtitlyService } from '../../../core/service/utility.service';
import { ErrorMessageConstants } from '../../constants/error-message.constants';
import { LabelConstants } from '../../constants/label.constants';
import { RouteLink } from '../../constants/route-link';

@Component({
	selector: 'side-bar-user-account',
  standalone: false,
	styleUrl: './side-bar-user-account.scss',
	templateUrl: './side-bar-user-account.html',
})
export class SideBarUserAccount {
	protected readonly label = LabelConstants;
	protected readonly routes = RouteLink;
	currentUrl: string = '';
	displayName: string = '';
	currentUser: UserProfile | null = null;
	currentImage: string | null =
		'http://bootdey.com/img/Content/avatar/avatar1.png';
	private destroy$ = new Subject<void>();

	constructor(
		private router: Router,
		private userState: UserStateService,
		private alert: AlertService,
		protected utility: UtitlyService
	) {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				takeUntil(this.destroy$)
			)
			.subscribe((event: NavigationEnd) => {
				this.currentUrl = event.urlAfterRedirects;

				const userProfilePath =
					'/' + this.routes.userRoute + '/' + this.routes.profileRoute;

				if (this.currentUrl === userProfilePath) {
					this.userState.fetchUserInfo();
				}
			});

		this.userState.user$.pipe(takeUntil(this.destroy$)).subscribe({
			next: user => {
				if (user) {
					this.currentUser = user;
					this.currentImage = user.avatar ?? this.currentImage;
					this.displayName = user.fullName ?? '';
				}
			},
			error: () => {
				this.alert.error(ErrorMessageConstants.cannotLoadUserInfo);
			},
		});
	}
	isActive(path: string): boolean {
		return this.currentUrl.startsWith(path);
	}

	isOAuthProvider(): boolean {
		if (!this.currentUser) return false;
		const oauthProviders = ['google', 'facebook'];
		return oauthProviders.includes(
			this.currentUser.authProvider?.toLowerCase() ?? ''
		);
	}
}
