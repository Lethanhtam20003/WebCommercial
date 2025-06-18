import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	output,
	Output,
} from '@angular/core';
import { CartItem } from '../../../core/models/response/cart/cart-response.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AlertService } from '../../../core/service/alert.service';
import { CartService } from '../../../core/service/cart/cart.service';

@Component({
	imports: [CommonModule, FormsModule],
	selector: 'app-cartItem',
	templateUrl: './cartItem.component.html',
	styleUrls: ['./cartItem.component.scss'],
})
export class CartItemComponent implements OnInit {
	constructor(
		private cartServide: CartService,
		private alert: AlertService
	) {}
	ngOnInit(): void {
		console.log("itemt"+this.item.isSelected);
	}
	@Input() item!: CartItem;

	@Output() quantityChanged = new EventEmitter<{
		productId: number;
		quantity: number;
	}>();
	@Output() removed = new EventEmitter<number>();
	@Output() selectionChanged = new EventEmitter<void>();

	increaseQuantity() {
		this.quantityChanged.emit({
			productId: this.item.ProductId,
			quantity: this.item.quantity + 1,
		});
	}

	decreaseQuantity() {
		if (this.item.quantity > 1) {
			this.quantityChanged.emit({
				productId: this.item.ProductId,
				quantity: this.item.quantity - 1,
			});
		}
	}

	removeItem() {
		this.removed.emit(this.item.ProductId);
	}
	onSelectionChange(): void {
		this.selectionChanged.emit();
	}
}
