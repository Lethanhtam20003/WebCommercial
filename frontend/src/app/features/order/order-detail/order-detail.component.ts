import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/service/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../core/service/alert.service';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/service/user.service';
import { UserProfile } from '../../../core/models/response/user/user-profile-response.model';
import { PurchaseStatus } from '../../../core/enum/PurchaseStatus';
import { OrderStatus } from '../../../core/enum/order-status.enum';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/service/cart/payment.service';

@Component({
	standalone: true,
	imports: [CommonModule, RouterLink, FormsModule ],
	selector: 'app-order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
	orderDetail!: OrderResponse;
	orderId!: number;
	user!: UserProfile;
	note: string = '';
	PurchaseStatus = PurchaseStatus;


	constructor(
		private orderService: OrderService,
		private route: ActivatedRoute,
		private router: Router,
		private alertService: AlertService,
		private userService: UserService,
		private paymentService: PaymentService
	) {}

	ngOnInit() {
		this.userService.getCurrentInfo().subscribe(res => {
			this.user = res;
		});

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
	getStatus(): String {
		switch (this.orderDetail.status) {
			case OrderStatus.PENDING:
				return 'Đang chờ xác nhận';
			case OrderStatus.CONFIRMED:
				return 'Đã xác nhận';
			case OrderStatus.SHIPPED:
				return 'Đang vận chuyển';
			case OrderStatus.DELIVERED:
				return 'Đang vận chuyển';
			case OrderStatus.CANCELLED:
				return 'Đã hủy';
			default:
				return 'Đang chờ xác nhận';
		}
	}

	payment() {
		this.paymentService.payment(this.orderDetail);
	}
}
