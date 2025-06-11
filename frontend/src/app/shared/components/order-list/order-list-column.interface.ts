import { TemplateRef } from "@angular/core";
import { OrderResponse } from "../../../core/models/response/order/order-response.interface";

export interface OrderListColumn {
  key: string; // key trong order object, hoặc tùy ý
  label: string; // tên hiển thị
  cell?: (order: OrderResponse) => string | number | TemplateRef<any>;
  type?: 'text' | 'currency' | 'date' | 'status' | 'action' | 'index';
  width?: string;
  formatFn?: (value: any, row?: any) => string;
}
