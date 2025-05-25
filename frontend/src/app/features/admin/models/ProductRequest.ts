export interface ProductRequest {
    name:String;
    price: number;
    status: String;
    categoryIds: number[];
    description: String;
    image: String[];
}