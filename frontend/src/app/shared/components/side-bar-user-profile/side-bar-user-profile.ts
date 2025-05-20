import { Component, OnInit } from '@angular/core';
import { Label } from '../../../core/constants/label.constants';
import {
	NavigationEnd,
	Router,
	RouterLink,
	RouterLinkActive,
} from '@angular/router';
import { RouteLink as Routes } from '../../../core/constants/route-link';
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
	selector: 'side-bar-user-profile',
	standalone: true,
	imports: [RouterLink, NgClass],
	styleUrl: './side-bar-user-profile.scss',
	templateUrl: './side-bar-user-profile.html',
})
export class SideBarUserProfile {
	protected readonly label = Label;
	protected readonly routes = Routes;
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
