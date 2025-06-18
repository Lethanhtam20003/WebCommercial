export interface PromotionResponse {
  promotionId: number;
  name: string;
  description: string;
  discountPercent: number;
  image: string;
  startDate: string;
  endDate: string;

  saved?: boolean;
  expired?: boolean;
  remainingTime?: string;
}
