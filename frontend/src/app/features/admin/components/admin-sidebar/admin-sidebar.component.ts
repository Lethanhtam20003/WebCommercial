import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { LabelConstants } from '../../../../shared/constants/label.constants';
import { RouteLink } from '../../../../shared/constants/route-link';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/service/auth.service';
@Component({
	standalone: true,
	imports: [RouterLink, CommonModule, RouterLinkActive],
	selector: 'app-admin-sidebar',
	templateUrl: './admin-sidebar.component.html',
	styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent implements OnInit {
	isProductMenuOpen = false;
	isCollapsed = true;
	isLoggedIn$: Observable<boolean>;
	constructor(
		private router: Router,
		private authService: AuthService
	) {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
		this.showCollapse(router);
	}
	label = LabelConstants;

	ngOnInit() {}

	showCollapse(router: Router): void {
		// Kiểm tra nếu route hiện tại là product-list/create-product => mở collapse
		const { url } = this.router;
		this.isProductMenuOpen = url.includes('/product-management/');
	}
	isInventoryMenuOpen = false;
	toggleInventoryMenu() {
		this.isInventoryMenuOpen = !this.isInventoryMenuOpen;
	}
	logout(): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
	toggleCollapse() {
		this.isCollapsed = !this.isCollapsed; // Đảo trạng thái
	}
}
