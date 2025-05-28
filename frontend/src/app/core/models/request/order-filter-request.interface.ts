import { OrderStatus } from "../../enum/order-status.enum";

export interface OrderFilterRequest {
  userId: number;
  status: OrderStatus;
  page: number;
  size: number;
}
