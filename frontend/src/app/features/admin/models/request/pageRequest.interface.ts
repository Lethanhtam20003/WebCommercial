export type SortDirection = 'asc' | 'desc' | 'none';

export interface PageRequest {
  page: number;
  size: number;
  sortMap?: { [key: string]: SortDirection }; // ví dụ: { name: 'asc', price: 'desc' }
}


