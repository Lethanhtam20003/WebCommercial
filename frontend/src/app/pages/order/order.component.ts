import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { OrderService } from '../../core/service/order.service';
import { OrderResponse } from '../../core/models/response/order/order-response.interface';
import { PageResponse } from '../../core/models/response/product-response/product-response/page-response.interface';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../core/enum/order-status.enum';
import { AlertService } from '../../core/service/alert.service';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule, RouterLink],
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
	
	orders!: OrderResponse[];
	idUser!: number;

	constructor(
		private router: Router,
		private orderService: OrderService,
		private userService: UserService,
		private alertService: AlertService
	) {}

	ngOnInit(): void {
		this.userService.getCurrentInfo().subscribe(data => {
			this.idUser = data.id; // Assuming 'id' is the correct property
			this.orderService.getAllOrdersUser(this.idUser).subscribe(data => {
				this.orders = data.result.content.filter(
					order => order.status !== OrderStatus.CANCELLED
				);
				console.log(this.orders);
			});
		});
	}

	cancelOrder(id: number) {
		this.orderService.cancelOrder(id).subscribe(() => {
			this.orders = this.orders.filter(order => order.id !== id);
			this.alertService.success('Hủy đơn hàng thành công!');
		});
	}
	payOrder(id: number) {
		this.router.navigate(['/payment', id]);
	}

	getStatusLabel(status: OrderStatus): string {
		switch (status) {
			case OrderStatus.PENDING:
				return 'Chờ xác nhận';
			case OrderStatus.CONFIRMED:
				return 'Đã xác nhận';
			case OrderStatus.SHIPPED:
				return 'Đang giao';
			case OrderStatus.DELIVERED:
				return 'Đã giao';
			case OrderStatus.CANCELLED:
				return 'Đã huỷ';
			default:
				return 'Không xác định';
		}
	}
}
