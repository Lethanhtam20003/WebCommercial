import { Component, OnInit } from '@angular/core';
import {
	NavigationEnd,
	Router,
	RouterLink,
	RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';
import { LabelConstants } from '../../constants/label.constants';
import { RouteLink } from '../../constants/route-link';

@Component({
	selector: 'side-bar-user-account',
	standalone: true,
	imports: [RouterLink, NgClass],
	styleUrl: './side-bar-user-account.scss',
	templateUrl: './side-bar-user-account.html',
})
export class SideBarUserProfile {
	protected readonly label = LabelConstants;
	protected readonly routes = RouteLink;
	currentUrl = '';
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
}
