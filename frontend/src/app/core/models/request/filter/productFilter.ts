import { ProductStatus } from "../../../enum/productStatus";

export interface ProductFilter {
    page: number;
    size: number;

    id?: number;
    name?: String;
    categoryId?: number[]; 
    status?: ProductStatus;
    minPrice?: number;
    maxPrice?: number; 
    promotionId?: number;

    sortByPrice?: string; 
}
