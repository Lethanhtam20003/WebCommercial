import { OrderStatus } from "../../enum/order-status.enum";
import { OrderItemResponse } from "./order-item-response.interface";

export interface OrderResponse {
  id: number;
  totalPrice: number;
  discountedPrice: number;
  status: OrderStatus;
  note: string;
  createdDate: string;
  orderItems: OrderItemResponse[];
}
