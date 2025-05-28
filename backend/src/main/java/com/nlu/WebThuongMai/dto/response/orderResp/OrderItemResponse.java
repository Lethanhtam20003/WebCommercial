package com.nlu.WebThuongMai.dto.response.orderResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemResponse {
    String productImage;
    String productName;
    Integer quantity;
    BigDecimal price;
}