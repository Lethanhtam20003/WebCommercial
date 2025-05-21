import { PagedProductResult } from './PagedProductResult';

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}