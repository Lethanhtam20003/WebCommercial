import { ProductResponse } from './productResponse';
export interface PagedProductResult {
  content: ProductResponse[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}