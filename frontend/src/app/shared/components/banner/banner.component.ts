import { Component } from '@angular/core';

@Component({
	selector: 'app-banner',
	standalone: false,
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.scss',
})
export class BannerComponent {
	protected banner1: string = 'assets/images/shop/banner-1.jpg';
	protected banner2: string = 'assets/images/shop/banner-2.webp';
	protected banner3: string = 'assets/images/shop/banner-3.jpeg';
	protected bannerWidth: string = '1000px';
	bannerStyle = {
		height: this.bannerWidth + ' !important',
		'object-fit': 'cover !important',
	};
}
