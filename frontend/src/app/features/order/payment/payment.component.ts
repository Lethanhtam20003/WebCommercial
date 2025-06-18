import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/service/order.service';
import { Router } from '@angular/router';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';

@Component({
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
	order!: OrderResponse;
	checkoutForm!: FormGroup;
	paymentMethod: 'COD' | 'VNPAY' = 'COD';

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private orderService: OrderService
	) {}

	ngOnInit(): void {
		const navigation = this.router.getCurrentNavigation();
		if (navigation && navigation.extras && navigation.extras.state) {
			this.order = navigation.extras.state['order'];
		
		}
	}

	submitOrder() {
		
	}
}
