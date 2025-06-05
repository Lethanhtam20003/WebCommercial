package com.nlu.WebThuongMai.dto.request.productReq;

import com.nlu.WebThuongMai.enums.ProductStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductFillterRequest {
    String name; // Tìm kiếm gần đúng (LIKE %keyword%).
    Long categoryId; // Lọc theo ID danh mục,
    ProductStatus status; //  enum ProductStatus như ACTIVE, INACTIVE.
    Double minPrice; // Lọc theo khoảng giá min - max.
    Double maxPrice; //Lọc theo khoảng giá min - max.
    long promotionId; // loc theo mã khuyến mãi
}
