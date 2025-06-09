import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
	BehaviorSubject,
	filter,
	map,
	Observable,
	of,
	switchMap,
	take,
	tap,
} from 'rxjs';
import { OrderStatus } from '../../../core/enum/order-status.enum';
import { OrderFilterRequest } from '../../../core/models/request/order/order-filter-request.interface';
import { OrderDetailResponse } from '../../../core/models/response/order/order-item-response.interface';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { AlertService } from '../../../core/service/alert.service';
import { OrderDetailService } from '../../../core/service/order-detail.service';
import { OrderStateService } from '../../../core/service/state/order-state.service';
import { UserStateService } from '../../../core/service/state/user-state.service';
import { UtitlyService } from '../../../core/service/utility.service';
import { ErrorMessageConstants } from '../../constants/error-message.constants';
import { LabelConstants } from '../../constants/label.constants';
import { OrderListColumn } from '../order-list/order-list-column.interface';

@Component({
	standalone: false,
	selector: 'app-order-mamangement',
	templateUrl: './order-management.component.html',
	styleUrl: './order-management.component.scss',
})
export class OrderManangementComponent implements OnInit {
	readonly label = LabelConstants;

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

	userOrderColumns: OrderListColumn[] = [
		{ key: 'index', label: '#', type: 'index' },
		{ key: 'id', label: 'Mã đơn', type: 'text' },
		{ key: 'createdDate', label: 'Ngày đặt', type: 'date' },
		{ key: 'status', label: 'Trạng thái', type: 'status' },
		{ key: 'totalPrice', label: 'Tổng tiền', type: 'currency' },
		{ key: 'action', label: 'Thao tác', type: 'action' },
	];

	status$ = new BehaviorSubject<string>('all');
	orders$!: Observable<OrderResponse[]>;
	selectedOrder$ = new BehaviorSubject<OrderResponse | null>(null);
	selectedOrderItems$ = new BehaviorSubject<OrderDetailResponse[]>([]);
	readonly safeSelectedOrderItems$: Observable<OrderDetailResponse[]> =
		this.selectedOrderItems$.pipe(map(items => items ?? []));
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userStateService: UserStateService,
		private alert: AlertService,
		private utility: UtitlyService,
		private orderStateService: OrderStateService,
		private orderDetailService: OrderDetailService
	) {}
	ngOnInit(): void {
		this.userStateService.loadUserFromStorageOrAPI();

		this.userStateService.user$
			.pipe(
				filter(user => !!user),
				take(1),
				tap(user => {
					this.route.paramMap.subscribe(params => {
						const paramStatus = params.get('status') || 'all';
						this.status$.next(paramStatus);
					});
				}),
				switchMap(user => this.status$),
				switchMap(status => {
					const currentUser = this.userStateService.currentUser;
					if (!currentUser?.id) {
						this.alert.error(ErrorMessageConstants.userNotExisted);
						return of([]);
					}

					if (status === 'all') {
						this.orderStateService.loadOrdersForUser(currentUser.id);
					} else {
						const request: OrderFilterRequest = {
							userId: currentUser.id,
							status: this.utility.mapStatusToBackend(status) as OrderStatus,
							page: 0,
							size: 10,
						};
						this.orderStateService.loadOrdersByStatus(request);
					}

					return of(null);
				})
			)
			.subscribe();
	}

	onStatusClick(key: string) {
		this.status$.next(key);

		this.router.navigate(['/user/orders', key]);
	}

	onViewOrder(orderId: number) {
		this.orders$.pipe(take(1)).subscribe(orderList => {
			const order = orderList.find(o => o.id === orderId) ?? null;
			this.selectedOrder$.next(order);

			if (!order) {
				this.selectedOrderItems$.next([]);
				return;
			}

			this.orderDetailService
				.getOrderDetailByOrderId({
					orderId: order.id,
					page: 0,
					size: 10,
				})
				.subscribe({
					next: items => this.selectedOrderItems$.next(items),
					error: err => {
						console.error('❌ Lỗi khi gọi API chi tiết đơn hàng:', err);
						this.selectedOrderItems$.next([]);
					},
				});
		});
	}

	onBack() {
		this.selectedOrder$.next(null);
		this.selectedOrderItems$.next([]);
	}
}
