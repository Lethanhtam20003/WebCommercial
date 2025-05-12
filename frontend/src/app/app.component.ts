import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import {NgIf} from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
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
		<app-header *ngIf="showHeader"></app-header>
		<router-outlet></router-outlet>
    <app-footer *ngIf="showFooter"></app-footer>
	`,
	styles: ``,
})
export class AppComponent implements OnInit {
	title: string = 'frontend';
	showHeader: boolean = true;
	showFooter: boolean = true;
	/*
	 * @describe: listening event from NavigationEnd to update current url
	 * */
	constructor( private router: Router) {
	}

	/*
	 * this method is called when the component is initialized
	 * */
	ngOnInit(): void {
		//get current url when initializing the app
		const currentUrl = this.router.url.replace(/^\/+/, '').split('?')[0];

		// // Cập nhật trạng thái hiển thị header/footer
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const data = this.getDeepestRouteData(this.router.routerState.root);
				this.showHeader = data['showHeader'] !== false;  // default true
				this.showFooter = data['showFooter'] !== false;  // default true
			}
   		});
	}
	/*
	 * @describe: get the deepest route data
	 * @param {ActivatedRoute}
	 * @return {any}
	 * */
	private getDeepestRouteData(route: ActivatedRoute): any {
		while (route.firstChild) {
			route = route.firstChild;
		}
		return route.snapshot.data || {};
	}
}
