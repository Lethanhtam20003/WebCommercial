import { NgModule } from '@angular/core';
import { CartComponent } from '../../../../shared/components/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [CartComponent],
	imports: [CommonModule, FormsModule, CartRoutingModule],
	exports: [CartComponent],
})
export class CartModule {}
