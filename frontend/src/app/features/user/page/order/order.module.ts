import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../../../../shared/components/order/order.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
	declarations: [OrderComponent],
	imports: [CommonModule, OrderRoutingModule],
	exports: [OrderComponent],
})
export class OrderModule {}
