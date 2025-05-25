import { Component, OnInit } from '@angular/core';
import {
	NavigationEnd,
	Router,
	RouterLink,
	RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { LabelConstants } from '../../constants/label.constants';
import { RouteLink } from '../../constants/route-link';

@Component({
	selector: 'side-bar-user-account',
	standalone: true,
	imports: [RouterLink, NgClass, CommonModule],
	styleUrl: './side-bar-user-account.scss',
	templateUrl: './side-bar-user-account.html',
})
export class SideBarUserProfile {
	protected readonly label = LabelConstants;
	protected readonly routes = RouteLink;
	currentUrl = '';

	readonly orderLabel: Record<string, string> = {
		all: this.label.all,
		pending: this.label.pending,
		shipped: this.label.shipped,
		delivered: this.label.delivered,
		canceled: this.label.canceled,
	};

	readonly orderStatus = ['all', 'pending', 'shipped', 'delivered', 'canceled'] as const;

	constructor(private router: Router) {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.currentUrl = event.urlAfterRedirects;
			});
	}
	isActive(path: string): boolean {
		console.log(this.currentUrl);
		return this.currentUrl === path;
	}

	capitalize(str: string): string {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
