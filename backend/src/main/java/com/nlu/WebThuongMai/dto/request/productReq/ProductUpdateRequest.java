package com.nlu.WebThuongMai.dto.request.productReq;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductUpdateRequest {
   String name;
   String description;
   Double price;
   String status; // ACTIVE, INACTIVE, DELETED
   Long categoryId;
   Long promotionId; // có thể null nếu không có khuyến mãi
   List<String> images; // URLs ảnh (hoặc dùng upload API riêng)
}
