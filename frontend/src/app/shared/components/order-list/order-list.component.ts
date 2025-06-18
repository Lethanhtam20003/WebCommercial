import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { UtitlyService } from '../../../core/service/utility.service';
import { OrderListColumn } from './order-list-column.interface';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
	selector: 'order-list',
	imports: [CommonModule, NgClass, PaginationComponent],
	standalone: true,
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
	constructor(public utility: UtitlyService) {}

	@Input() orders: OrderResponse[] = [];
	@Input() columns: OrderListColumn[] = [];
	@Input() currentPage = 1;
	@Input() totalPages = 1;

	@Output() viewOrder = new EventEmitter<number>();
	@Output() pageChanged = new EventEmitter<number>();

	onView(orderId: number) {
		this.viewOrder.emit(orderId);
	}

	onPageChanged(page: number) {
		this.pageChanged.emit(page);
	}

	trackById = (_: number, order: OrderResponse) => order.id;
	trackByKey = (_: number, col: OrderListColumn) => col.key;
}
