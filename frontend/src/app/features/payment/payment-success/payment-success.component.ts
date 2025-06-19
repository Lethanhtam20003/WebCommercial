import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { URL_API } from '../../../shared/constants/url-api.constants';
import { ApiResponse } from '../../../core/models/api-response.model';
import { PaymentService } from '../../../core/service/cart/payment.service';

@Component({
	standalone: true,
	imports: [RouterLink],
	selector: 'app-payment-success',
	templateUrl: './payment-success.component.html',
	styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
	message = 'Đang xác nhận thanh toán...';

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private router: Router,
		private paymentService: PaymentService
	) {}

	ngOnInit(): void {
		const token = this.route.snapshot.queryParamMap.get('token');
		const orderId = localStorage.getItem('orderId'); // hoặc truyền orderId qua URL

		console.log(orderId);
		if (token && orderId) {
			this.paymentService.confirmPayment(token, orderId).subscribe({
				next: res => {
					if (res.code === 200) {
						this.message = 'Thanh toán thành công!';
						// this.router.navigate(['/orders']);
					}
				},
				error: res => {
					this.message = 'Thanh toán thất bại hoặc đã bị hủy.'+ res.message;
				},
			});
		} else {
			this.message = 'Không tìm thấy thông tin thanh toán.';
		}
	}
}
