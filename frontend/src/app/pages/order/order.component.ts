import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../core/service/alert.service';
import { CartItem } from '../../core/models/response/cart/cart-response.interface';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-order',
	standalone: true,
	imports: [
		CommonModule,
		
	],
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss',
})
export class OrderComponent {
	cartItems: CartItem[] = [];
	total: number = 0;

	constructor(
		private router: Router,
		private alert: AlertService
	) {
		const nav = this.router.getCurrentNavigation();
		this.cartItems = nav?.extras?.state?.['cartItems'] || [];
		this.updateTotal();
	}

	updateTotal(): void {
		this.total = this.cartItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
	}

	confirmOrder() {
		this.alert
			.loading(
				'Hệ thống đang tạo đơn hàng, vui lòng đợi một chút',
				'Đang tạo đơn hàng...'
			)
			.then(() => this.router.navigate(['/order-success']));
	}

	
	buttonStates: { [key: number]: boolean } = {};

	onPress(id: number) {
		this.buttonStates[id] = true;
	}

	onRelease(id: number) {
		this.buttonStates[id] = false;
	}
}
