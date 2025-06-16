import { AfterViewInit, Component } from '@angular/core';

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
		const el = document.getElementById('carouselExampleAutoplaying');
		if (el && (window as any).bootstrap?.Carousel) {
			const carousel = new (window as any).bootstrap.Carousel(el, {
				interval: 5000,
				ride: 'carousel',
			});

			el.addEventListener('slid.bs.carousel', (e: any) => {
				// Nếu quay lại slide đầu thì reset gì đó nếu cần
				if (e.to === 0) {
					// Gợi ý: có thể gọi lại carousel.cycle() nếu nó dừng
					carousel.cycle();
				}
			});
		}
	}
}
