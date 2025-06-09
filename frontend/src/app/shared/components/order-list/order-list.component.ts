import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';
import { UtitlyService } from '../../../core/service/utility.service';
import { OrderListColumn } from './order-list-column.interface';

@Component({
	selector: 'order-list',
  imports: [CommonModule, NgClass],
  standalone: true,
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
	constructor(public utility: UtitlyService) {}

	@Input() orders: OrderResponse[] = [];
	@Input() columns: OrderListColumn[] = [];

	@Output() viewOrder = new EventEmitter<number>();

	onView(orderId: number) {
		this.viewOrder.emit(orderId);
	}

	trackById = (_: number, order: OrderResponse) => order.id;
	trackByKey = (_: number, col: OrderListColumn) => col.key;
}
