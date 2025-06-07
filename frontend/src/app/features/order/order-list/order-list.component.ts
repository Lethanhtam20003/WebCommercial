import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtitlyService } from '../../../core/service/utility.service';
import { OrderResponse } from '../../../core/models/response/order/order-response.interface';

@Component({
	imports: [NgClass, CommonModule],
	standalone: true,
	selector: 'order-list-admin',
	templateUrl: './order-list.component.html',
	styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
	@Input() orders: OrderResponse[] = [];
	@Output() viewOrder = new EventEmitter<number>();

  constructor(protected utility: UtitlyService){}
	onView(orderId: number) {
		this.viewOrder.emit(orderId);
	}
}
