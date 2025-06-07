import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderResponse } from "../../../core/models/response/order/order-response.interface";
import { OrderDetailResponse } from "../../../core/models/response/order/order-item-response.interface";

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'order-detail-admin',
  templateUrl: './order-detail-admin.component.html',
  styleUrl: './order-detail-admin.component.scss',
})
export class OrderDetailComponent {
  @Input() order!: OrderResponse;
  @Input() orderItems: OrderDetailResponse[] = [];
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
