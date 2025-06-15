import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../../../../shared/components/cart/cart.component';

@NgModule({
	declarations: [CartComponent],
	imports: [CommonModule, FormsModule],
	exports: [CartComponent],
})
export class CartModule {}
