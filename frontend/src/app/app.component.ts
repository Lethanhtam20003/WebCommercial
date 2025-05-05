import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import {NgIf} from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouteLink } from './core/constants/route-link';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({

	selector: 'app-root',
	imports: [
		RouterOutlet,
		HeaderComponent,
		SocialLoginModule,
		NgIf,
		FooterComponent,
	],
	standalone: true,
	template: `
		<app-header *ngIf="showHeaderFooter"></app-header>
		<router-outlet></router-outlet>
    <app-footer></app-footer>
	`,
	styles: ``,
})
export class AppComponent implements OnInit {
	title: string = 'frontend';
	showHeaderFooter: boolean = true;

	/*
	 * list of routes that don't need header and footer
	 * */
	private dontNeedHeaderFooterPages: string[] = [
		RouteLink.loginRoute,
		RouteLink.registerRoute,
		// RouteLink.dashboardRoute,
		RouteLink.forgotPasswordRoute,
		RouteLink.profileRoute,
		RouteLink.resetPasswordRoute,
	];

	/*
	 * @describe: listening event from NavigationEnd to update current url
	 * */
	constructor(private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const currentUrl = event.urlAfterRedirects;
				this.showHeaderFooter = !this.dontNeedHeaderFooterPages.some(route =>
					currentUrl.startsWith('/' + route)
				);
			}
		});
	}

	/*
	 * this method is called when the component is initialized
	 * */
	ngOnInit(): void {
		//get current url when initializing the app
		const currentUrl = this.router.url.replace(/^\/+/, '').split('?')[0];

		// Cập nhật trạng thái hiển thị header/footer
		this.showHeaderFooter =
			!this.dontNeedHeaderFooterPages.includes(currentUrl);
	}
}
