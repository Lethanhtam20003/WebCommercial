import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { RouteLink } from './constant/route-link';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, FooterComponent, SocialLoginModule],
	standalone: true,
	template: `
		<app-header *ngIf="!needHeaderFooter"></app-header>
		<router-outlet></router-outlet>
		<app-footer *ngIf="!needHeaderFooter"></app-footer>
	`,
	styles: ``,
})
export class AppComponent {
	title = 'frontend';
	needHeaderFooter = false;

  /*
  * list of routes that don't need header and footer
  * */
	private needHeaderFooterPages: string[] = [
		RouteLink.loginRoute,
		RouteLink.registerRoute,
		RouteLink.dashboardRoute,
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
				this.needHeaderFooter = this.needHeaderFooterPages.some(route =>
					this.needHeaderFooterPages.includes(route)
				);
			}
		});
	}
}
