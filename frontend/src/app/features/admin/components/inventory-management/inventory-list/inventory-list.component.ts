import { Component, OnInit } from '@angular/core';
import { AdminPurchaseOrderService } from '../../../../../core/service/purchaseOrder/Admin_purchase_order.service';
import { AlertService } from '../../../../../core/service/alert.service';
import { PageResponse } from '../../../../../core/models/response/product-response/product-response/page-response.interface';
import { InventoryResponse } from '../../../../../core/models/response/purchase-order/InventoryResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	selector: 'app-inventory-list',
	imports: [FormsModule, CommonModule],
	templateUrl: './inventory-list.component.html',
	styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit {
	inventoty!: PageResponse<InventoryResponse>;
	constructor(
		private purchaseOrder: AdminPurchaseOrderService,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.purchaseOrder.getInventories().subscribe({
			next: res => {
				this.inventoty = res.result;
				this.filterInventory();

				console.log(this.inventoty);
			},
			error: err => {
				console.error('Lỗi khi load đơn hàng:', err);
			},
		});
	}

	searchTerm: string = '';
	sortBy: 'id' | 'quantity' = 'id';
	filteredInventory: InventoryResponse[] = [];
	leftColumn: InventoryResponse[] = [];
	rightColumn: InventoryResponse[] = [];

	filterInventory() {
		const filtered = this.inventoty.content
			.filter(item =>
				item.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
			)
			.sort((a, b) => {
				if (this.sortBy === 'id') {
					return a.id - b.id;
				}
				if (this.sortBy === 'quantity') {
					return b.quantity - a.quantity;
				}
				return 0;
			});

		this.filteredInventory = filtered;

		// Tách thành 2 cột
		const mid = Math.ceil(filtered.length / 2);
		this.leftColumn = filtered.slice(0, mid);
		this.rightColumn = filtered.slice(mid);
	}
}
