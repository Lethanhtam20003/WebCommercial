import { OrderStatus } from "../../enum/order-status.enum";
import { OrderDetailResponse } from '../response/order-item-response.interface';

export interface OrderResponse {
  id: number;
  totalPrice: number;
  discountedPrice: number;
  status: OrderStatus;
  note: string;
  createdDate: string;
  orderItems: OrderDetailResponse[];
}
