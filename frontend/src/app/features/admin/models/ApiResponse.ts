import { PagedProductResult } from './PagedProductResult';

export interface ApiResponse {
  code: number;
  message: string;
  result: PagedProductResult;
}