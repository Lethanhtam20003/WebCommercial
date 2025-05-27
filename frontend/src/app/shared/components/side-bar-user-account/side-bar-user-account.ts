import { Component, OnInit } from '@angular/core';
import {
	NavigationEnd,
	Router,
	RouterLink,
	RouterLinkActive,
} from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { LabelConstants } from '../../constants/label.constants';
import { RouteLink } from '../../constants/route-link';
import { AuthService } from '../../../core/service/auth.service';
import { ErrorMessageConstants } from '../../constants/error-message.constants';
import { UserService } from '../../../core/service/user.service';
import { UserProfile } from '../../../core/models/user-profile.model';
import { UserStateService } from '../../../core/service/user-state.service';
import { AlertService } from '../../../core/service/alert.service';
import { UtitlyService } from '../../../core/service/utility.service';

@Component({
	selector: 'side-bar-user-account',
	standalone: true,
	imports: [RouterLink, NgClass, CommonModule],
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

	readonly orderLabel: Record<string, string> = {
		all: this.label.all,
		pending: this.label.pending,
		shipped: this.label.shipped,
		delivered: this.label.delivered,
		canceled: this.label.canceled,
	};

	readonly orderStatus = [
		'all',
		'pending',
		'shipped',
		'delivered',
		'canceled',
	] as const;

	constructor(
		private router: Router,
		private userState: UserStateService,
		private alert: AlertService,
		protected utility: UtitlyService
	) {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.currentUrl = event.urlAfterRedirects;
			});

		this.userState.user$.pipe(takeUntil(this.destroy$)).subscribe({
			next: user => {
				if (user) {
					this.currentUser = user;
					this.currentImage = user.avatar ?? this.currentImage;
					this.displayName =
						`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
				}
			},
			error: () => {
				this.alert.error(ErrorMessageConstants.cannotLoadUserInfo);
			},
		});
	}
	isActive(path: string): boolean {
		return this.currentUrl === path;
	}
}
