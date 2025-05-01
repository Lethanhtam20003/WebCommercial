import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouteLink } from '../../constant/route-link';
import { LabelConstants } from '../../constant/label.constants';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrl: 'footer.component.scss',
	imports: [NgOptimizedImage],
	standalone: true,
})
export class FooterComponent {
	logo2: string = 'assets/images/shop/logo2.png';
	protected readonly RouteLink = RouteLink;
	protected readonly Label = LabelConstants;
}
