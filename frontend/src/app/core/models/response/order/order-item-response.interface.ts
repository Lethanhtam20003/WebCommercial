export interface OrderDetailResponse {
	id: number;
	productId: number;
	productName: string;
	productImage: string;
	quantity: number;
	price: number; // giá tại thời điểm thanh toán
}
