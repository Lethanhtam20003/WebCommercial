import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-order-mamangement',
	imports: [CommonModule],
	templateUrl: './order-mamangement.component.html',
	styleUrl: './order-mamangement.component.scss',
})
export class OrderMamangementComponent implements OnInit {
	status: string = '';
  filteredOrders: Order[] = [];
	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.status = params.get('status') || 'all';
			this.loadOrdersByStatus(this.status); // gọi API hoặc filter tại đây
		});
	}

	loadOrdersByStatus(status: string) {
		if (status === 'all') {
			this.filteredOrders = this.orders;
		} else {
			this.filteredOrders = this.orders.filter(
				order => order.status === status
			);
		}
	}

	viewOrder(order: Order) {
		alert(`Xem đơn hàng: ${order.id}`);
	}

	cancelOrder(order: Order) {
		if (order.status !== 'Đã huỷ') {
			const confirmCancel = confirm(`Bạn có chắc muốn huỷ đơn ${order.id}?`);
			if (confirmCancel) {
				order.status = 'Đã huỷ';
			}
		}
	}

	orders: Order[] = [
		{
			id: 'OD001',
			customerName: 'Nguyễn Văn A',
			orderDate: new Date('2024-05-20'),
			status: 'Chờ xác nhận',
			total: 1200000,
		},
		{
			id: 'OD002',
			customerName: 'Trần Thị B',
			orderDate: new Date('2024-05-18'),
			status: 'Đang giao',
			total: 780000,
		},
		{
			id: 'OD003',
			customerName: 'Phạm Văn C',
			orderDate: new Date('2024-05-17'),
			status: 'Hoàn tất',
			total: 2350000,
		},
		{
			id: 'OD004',
			customerName: 'Lê Thị D',
			orderDate: new Date('2024-05-10'),
			status: 'Đã huỷ',
			total: 900000,
		},
	];
}

interface Order {
	id: string;
	customerName: string;
	orderDate: Date;
	status: 'Chờ xác nhận' | 'Đang giao' | 'Hoàn tất' | 'Đã huỷ';
	total: number;
}
