export interface PromotionAdminResponse {
  promotionId: number;
  name: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  description: string;
  image: string;

  // Các trường phụ trợ để dễ thao tác UI (nếu cần)
  expired?: boolean;
  remainingTime?: string;
}
