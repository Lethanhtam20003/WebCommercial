import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../features/product/product-list/product-list.component';
import { OutstandingProductCatalogComponent } from '../../features/category/OutstandingProductCatalog/OutstandingProductCatalog.component';
import { BannerModule } from '../../shared/components/banner/banner.module';
import { User_catgory_listComponent } from '../../features/category/user_catgory_list/user_catgory_list.component';
import { PromotionListComponent } from '../../shared/components/promotion-list/promotion-list.component';
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		RouterModule,
		ProductListComponent,
		OutstandingProductCatalogComponent,
		BannerModule,
    PromotionListComponent,
    User_catgory_listComponent
	],
	template: `
		<app-banner></app-banner>
		<app-promotion-list></app-promotion-list>
		<app-user_catgory_list></app-user_catgory_list>
		<app-OutstandingProductCatalog></app-OutstandingProductCatalog>
		<app-product-list></app-product-list>
	`,
	styleUrl: './home.component.scss',
})
export class HomeComponent {}
