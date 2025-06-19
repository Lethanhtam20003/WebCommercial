package com.nlu.WebThuongMai.dto.response.orderResp;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemResponse {
    long id;
    long productId;
    String productName;
    String productImage;
    Integer quantity;
    BigDecimal price;
    BigDecimal totalItemPrice;
}

