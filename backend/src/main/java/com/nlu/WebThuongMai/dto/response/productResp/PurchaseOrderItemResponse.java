package com.nlu.WebThuongMai.dto.response.productResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderItemResponse implements Serializable {
    Long id;
    ProductResponse product;
    Integer quantity;
    BigDecimal unitPrice;
}