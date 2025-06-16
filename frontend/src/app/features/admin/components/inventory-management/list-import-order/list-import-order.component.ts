import { Component, NgModule, OnInit } from '@angular/core';
import { OrderService } from '../../../../../core/service/order.service';
import { PurchaseOrderResponse } from '../../../../../core/models/response/purchase-order/purchaseOrderResponse';
import { AdminPurchaseOrderService } from '../../../../../core/service/purchaseOrder/Admin_purchase_order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteLink } from '../../../../../shared/constants/route-link';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [ CommonModule,
	FormsModule,
    RouterModule,
  ],
  
	selector: 'app-list-import-order',
	templateUrl: './list-import-order.component.html',
	styleUrls: ['./list-import-order.component.scss'],
})
export class ListImportOrderComponent implements OnInit {
	constructor(private purchaseOrderService: AdminPurchaseOrderService) {}
	purchaseOrders: PurchaseOrderResponse[] = [];
  

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
		console.log('Xem đơn hàng:', id);
		// Điều hướng hoặc mở modal chi tiết
	}

	edit(id: number) {
		console.log('Sửa đơn hàng:', id);
		// Điều hướng đến trang chỉnh sửa
	}

	remove(id: number) {
		if (confirm('Bạn có chắc muốn xoá đơn hàng này?')) {
			console.log('Xoá đơn hàng:', id);
			// Gọi API xoá tại đây
		}
	}


	deleteOrder(id: number) {
		if (confirm('Bạn có chắc chắn muốn xoá đơn hàng này không?')) {
			// Gọi API xoá
		}
	}
}
