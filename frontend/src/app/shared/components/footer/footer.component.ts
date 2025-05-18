import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouteLink } from '../../../shared/constants/route-link';
import { LabelConstants } from '../../../shared/constants/label.constants';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrl: 'footer.component.scss',
	// imports: [NgOptimizedImage],
	standalone: true,
})
export class FooterComponent {
	logo: string = 'assets/images/shop/logo.png';
	protected readonly RouteLink = RouteLink;
	protected readonly Label = LabelConstants;
}
