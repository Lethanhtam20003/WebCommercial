import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from '../../../core/enum/order-status.enum';
import { OrderFilterRequest } from '../../../core/models/request/order-filter-request.interface';
import { OrderResponse } from '../../../core/models/response/order-response.interface';
import { AlertService } from '../../../core/service/alert.service';
import { OrderStateService } from '../../../core/service/state/order-state.service';
import { UserStateService } from '../../../core/service/state/user-state.service';
import { UtitlyService } from '../../../core/service/utility.service';
import { ErrorMessageConstants } from '../../constants/error-message.constants';
import { LabelConstants } from '../../constants/label.constants';
import { filter, take } from 'rxjs';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
	standalone: true,
	selector: 'app-order-mamangement',
	imports: [CommonModule, OrderListComponent, OrderDetailComponent],
	templateUrl: './order-management.component.html',
	styleUrl: './order-management.component.scss',
})
export class OrderMamangementComponent implements OnInit {
	status: string = '';
	orders: OrderResponse[] = [];
  selectedOrder?: OrderResponse;
	private readonly label = LabelConstants;
	readonly orderLabel: Record<string, string> = {
		all: this.label.all,
		pending: this.label.pending,
		shipped: this.label.shipped,
		delivered: this.label.delivered,
		canceled: this.label.canceled,
	};

	readonly orderStatus = [
		'all',
		'pending',
		'shipped',
		'delivered',
		'canceled',
	] as const;

	constructor(
		private route: ActivatedRoute,
		private orderStateService: OrderStateService,
		protected utility: UtitlyService,
		private userStateService: UserStateService,
		private alert: AlertService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.userStateService.loadUserFromStorageOrAPI();

		this.userStateService.user$
			.pipe(
				filter(user => !!user),
				take(1)
			)
			.subscribe(user => {
				this.route.paramMap.subscribe(params => {
					this.status = params.get('status') || 'all';

					this.loadOrdersByStatus(this.status);
				});

				this.orderStateService.orders$.subscribe(response => {
					this.orders = response;
				});
			});
	}

	loadOrdersByStatus(status: string) {
		const currentUser = this.userStateService.currentUser;

		if (!currentUser || !currentUser.id) {
			this.alert.error(ErrorMessageConstants.userNotExisted);
			this.orders = [];
			return;
		}

		if (status === 'all') {
			// Gọi đúng hàm chỉ nhận userId
			this.orderStateService.loadOrdersForUser(currentUser.id);
		} else {
			const request: OrderFilterRequest = {
				userId: currentUser.id,
				status: this.utility.mapStatusToBackend(status) as OrderStatus,
        page: 0,
        size: 10,
			};
			// Gọi hàm nhận object
			this.orderStateService.loadOrdersByStatus(request);
		}
	}

	onStatusClick(key: string) {
		this.status = key;

		this.router.navigate(['/user/orders', key]);
	}

  onViewOrder(orderId: number) {
    this.selectedOrder = this.orders.find(o => o.id === orderId);
  }

  onBack() {
    this.selectedOrder = undefined;
  }

}
