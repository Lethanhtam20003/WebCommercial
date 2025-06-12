import { AfterViewInit, Component } from '@angular/core';
import { Carousel } from 'bootstrap';

@Component({
	selector: 'app-banner',
	standalone: false,
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.scss',
})
export class BannerComponent implements AfterViewInit {
	protected banner1: string = 'assets/images/shop/banner-1.jpg';
	protected banner2: string = 'assets/images/shop/banner-2.jpg';
	protected banner3: string = 'assets/images/shop/banner-3.jpg';

	ngAfterViewInit(): void {
		const element = document.querySelector('#carouselExampleAutoplaying');
		if (element) {
			new Carousel(element, {
				interval: 1000,
				ride: 'carousel',
			});
		}
	}
}
