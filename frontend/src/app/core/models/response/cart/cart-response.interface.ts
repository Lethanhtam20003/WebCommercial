export interface CartItem {
	ProductId: number;
	name: string;
	price: number;
	quantity: number;
	productImg: string;
	isSelected?: boolean;
}
