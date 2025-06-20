export interface CreatePromotionRequest {
  name: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
}
