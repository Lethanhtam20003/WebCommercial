import { Component, OnInit } from '@angular/core';
import { AdminPurchaseOrderService } from '../../../../../core/service/purchaseOrder/Admin_purchase_order.service';
import { PurchaseOrderResponse } from '../../../../../core/models/response/purchase-order/purchaseOrderResponse';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { PurchaseStatus } from '../../../../../core/enum/PurchaseStatus';
import { AlertService } from '../../../../../core/service/alert.service';
import { RouteLink } from '../../../../../shared/constants/route-link';

@Component({
	standalone: true,
	imports: [CommonModule, NgIf,RouterLink],
	selector: 'app-purchase-order-detail',
	templateUrl: './purchase-order-detail.component.html',
	styleUrls: ['./purchase-order-detail.component.scss'],
})
export class PurchaseOrderDetailComponent implements OnInit {
	orderId!: number;

	purchase!: PurchaseOrderResponse;

	PurchaseStatus = PurchaseStatus;
	constructor(
		private route: ActivatedRoute,
		private purchaseOrderService: AdminPurchaseOrderService,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.orderId = +this.route.snapshot.paramMap.get('id')!;

		this.purchaseOrderService
			.getPurchaseOrderById(this.orderId)
			.subscribe(res => {
				this.purchase = res.result;
				console.log(this.purchase);
			});
	}

	updateStatus(status: string) {
		this.purchaseOrderService.updateStatus(this.orderId, status).subscribe({
			next: res => {
				this.alertService.success('Xác nhận đơn hàng thành công');
				this.purchase = res.result;
			},
			error: err => this.alertService.error('Xác nhận đơn hàng thất bại'),
		});
	}
}
