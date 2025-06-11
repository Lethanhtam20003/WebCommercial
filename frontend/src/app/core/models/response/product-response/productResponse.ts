import { CategoryResponse } from "./CategoryResponse";
import { PromotionResponse } from "./PromotionResponse";

export interface ProductResponse {
  id: number;
  name: string;
  price: string;
  status: string;
  categories: CategoryResponse[];
  description: string;
  images: string[];
  hot: number;
  promotions: PromotionResponse[];
}

    