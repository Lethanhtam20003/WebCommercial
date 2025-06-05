export type SortDirection = 'asc' | 'desc' | 'none';

export interface PageRequest {
  page: number;
  size: number;
  sortMap?: { [key: string]: SortDirection }; // ví dụ: { name: 'asc', price: 'desc' }
  filterMap?: { [key: string]: any }; // ví dụ: { minPrice: 100, maxPrice: 500 }
}


