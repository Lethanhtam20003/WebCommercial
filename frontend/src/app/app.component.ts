import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgIf } from '@angular/common';
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
export class AppComponent {
	title: string = 'frontend';
	showHeaderFooter: boolean = true;
}
