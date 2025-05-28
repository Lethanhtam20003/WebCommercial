import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderResponse } from "../../../core/models/response/order-response.interface";
import { CommonModule } from "@angular/common";

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  @Input() order!: OrderResponse;
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
