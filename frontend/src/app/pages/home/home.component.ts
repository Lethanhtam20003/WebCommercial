import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../features/product/product-list/product-list.component';
import { OutstandingProductCatalogComponent } from '../../features/category/OutstandingProductCatalog/OutstandingProductCatalog.component';
import { BannerModule } from '../../shared/components/banner/banner.module';
import { PromotionListModule } from '../../shared/components/promotion-list/promotion-list.module';
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		RouterModule,
		ProductListComponent,
		OutstandingProductCatalogComponent,
		BannerModule,
    PromotionListModule
	],
	template: `
		<app-banner></app-banner>
    <app-promotion-list></app-promotion-list>
		<app-OutstandingProductCatalog></app-OutstandingProductCatalog>
		<app-product-list></app-product-list>
		<!-- <app-product-list2></app-product-list2> -->
	`,
	styleUrl: './home.component.scss',
})
export class HomeComponent {}
