import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/service/order.service';
import { OrderCreateRequest } from '../../../core/models/request/order/OrderCreateRequest';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  checkoutForm!: FormGroup;
  paymentMethod: 'COD' | 'VNPAY' = 'COD';

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      address: ['', Validators.required],
      note: [''],
    });
  }

  selectPayment(method: 'COD' | 'VNPAY') {
    this.paymentMethod = method;
  }

  submitOrder() {
    // if (this.checkoutForm.invalid) {
    //   this.checkoutForm.markAllAsTouched();
    //   return;
    // }

    // const formData: OrderCreateRequest = {
    //   address: this.checkoutForm.value.address,
    //   note: this.checkoutForm.value.note,
    //   paymentMethod: this.paymentMethod,
    // };

    // this.orderService.checkoutOrder(formData).subscribe({
    //   next: res => {
    //     if (this.paymentMethod === 'VNPAY') {
    //       window.location.href = res.result.vnpayUrl;
    //     } else {
    //       alert('Đặt hàng thành công!');
    //     }
    //   },
    //   error: err => {
    //     console.error('Lỗi đặt hàng:', err);
    //     alert('Đặt hàng thất bại!');
    //   },
    // });
  }
}
