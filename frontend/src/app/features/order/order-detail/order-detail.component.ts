import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/service/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../core/service/alert.service';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	imports: [CommonModule,RouterLink],
	selector: 'app-order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
	orderDetail!: OrderResponse;
	orderId!: number;

	constructor(
		private orderService: OrderService,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.orderId = +params['id'];
			this.orderService.getOrderDetail(this.orderId).subscribe({
				next: response => {
					if (response.code === 200) {
						this.orderDetail = response.result;
						console.log(this.orderDetail);
					} else {
						this.alertService.error(
							response.message ?? 'An unknown error occurred'
						);
					}
				},
				error: error => {
					console.error('Error fetching order detail:', error);
					this.alertService.error('Error fetching order detail');
				},
			});
		});
	}
}
