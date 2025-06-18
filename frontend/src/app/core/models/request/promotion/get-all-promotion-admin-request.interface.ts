export interface GetAllPromotionAdminRequest {
  page: number;
  size: number;
  name?: string;
  startDateFrom?: string;
  endDateTo?: string;
  minDiscount?: string;
}
