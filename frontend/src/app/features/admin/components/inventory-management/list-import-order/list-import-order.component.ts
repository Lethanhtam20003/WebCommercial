import { Component, NgModule, OnInit } from '@angular/core';
import { OrderService } from '../../../../../core/service/order.service';
import { PurchaseOrderResponse } from '../../../../../core/models/response/purchase-order/purchaseOrderResponse';
import { AdminPurchaseOrderService } from '../../../../../core/service/purchaseOrder/Admin_purchase_order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteLink } from '../../../../../shared/constants/route-link';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../../../../core/service/alert.service';
import { PurchaseStatus } from '../../../../../core/enum/PurchaseStatus';

@Component({
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],

	selector: 'app-list-import-order',
	templateUrl: './list-import-order.component.html',
	styleUrls: ['./list-import-order.component.scss'],
})
export class ListImportOrderComponent implements OnInit {
	constructor(
		private purchaseOrderService: AdminPurchaseOrderService,
		private router: Router,
		private alertService: AlertService
	) {}
	purchaseOrders: PurchaseOrderResponse[] = [];
	PurChaseStatus = PurchaseStatus;

	ngOnInit(): void {
		this.purchaseOrderService.getPurchaseOrders().subscribe({
			next: res => {
				this.purchaseOrders = res.result;
			},
			error: err => {
				console.error('Lỗi khi load đơn hàng:', err);
			},
		});
	}

	statusClass(status: string): string {
		switch (status) {
			case 'PENDING':
				return 'badge bg-secondary';
			case 'RECEIVED':
				return 'badge bg-success';
			case 'CANCELLED':
				return 'badge bg-danger';
			default:
				return 'badge bg-dark';
		}
	}

	view(id: number) {
		this.router.navigate(['admin/inventory-management/view', id]);
	}

	edit(id: number) {
		console.log(this.purchaseOrders);
		console.log('edit'+id+ this.purchaseOrders[id-1].status);
		
		switch (this.purchaseOrders[id-1].status) {
			case this.PurChaseStatus.PENDING:
				this.alertService
					.confirm('Nhận đơn hàng Mã số: ' + id + ' ?')
					.then(result => {
						if (result) {
							this.purchaseOrderService
								.updateStatus(
									this.purchaseOrders[id].id,
									this.PurChaseStatus.RECEIVED
								)
								.subscribe({
									next: res => {
										this.purchaseOrders[id].status =
											this.PurChaseStatus.RECEIVED;
										this.alertService.success(
											'Cập nhật trạng thái đơn hàng thành công'
										);
									},
									error: err => {
										this.alertService.error(
											'Lỗi khi cập nhật trạng thái đơn hàng:',
											err
										);
									},
								});
						}
					});
				break;
			case this.PurChaseStatus.RECEIVED:
				this.alertService.warning('Đơn hàng đã được nhận ');
				break;
			case this.PurChaseStatus.CANCELLED:
				this.alertService.warning('Đơn hàng đã được hủy ');
				break;
		}
	}

	remove(id: number) {
		switch (this.purchaseOrders[id].status) {
			case this.PurChaseStatus.PENDING:
				this.alertService
					.confirm('Xoá đơn hàng Mã số: ' + id + ' ?')
					.then(result => {
						if (result) {
							this.purchaseOrderService
								.updateStatus(
									this.purchaseOrders[id].id,
									this.PurChaseStatus.CANCELLED
								)
								.subscribe({
									next: res => {
										this.purchaseOrders[id].status =
											this.PurChaseStatus.CANCELLED;
										this.alertService.success('Xoá đơn hàng thành công');
									},
									error: err => {
										this.alertService.error('Lỗi khi xoá đơn hàng:', err);
									},
								});
						}
					});
				break;
			case this.PurChaseStatus.RECEIVED:
				this.alertService
					.confirm(
						'Đơn hàng đã được nhận \n có thực sự muốn xóa đơn hàng này không?'
					)
					.then(result => {
						if (result) {
							this.purchaseOrderService
								.updateStatus(
									this.purchaseOrders[id].id,
									this.PurChaseStatus.CANCELLED
								)
								.subscribe({
									next: res => {
										this.purchaseOrders[id].status =
											this.PurChaseStatus.CANCELLED;
										this.alertService.success('Xoá đơn hàng thành công');
									},
									error: err => {
										this.alertService.error('Lỗi khi xoá đơn hàng:', err);
									},
								});
						}
					});
				break;
			case this.PurChaseStatus.CANCELLED:
				this.alertService.warning('Đơn hàng đã được hủy ');
				break;
		}
	}

	deleteOrder(id: number) {
		if (confirm('Bạn có chắc chắn muốn xoá đơn hàng này không?')) {
			// Gọi API xoá
		}
	}
}
