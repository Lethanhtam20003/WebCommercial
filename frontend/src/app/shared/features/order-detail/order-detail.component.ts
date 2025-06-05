import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderResponse } from "../../../core/models/response/order/order-response.interface";
import { CommonModule } from "@angular/common";
import { OrderDetailResponse } from "../../../core/models/response/order/order-item-response.interface";

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  @Input() order!: OrderResponse;
  @Input() orderItems: OrderDetailResponse[] = [];
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
