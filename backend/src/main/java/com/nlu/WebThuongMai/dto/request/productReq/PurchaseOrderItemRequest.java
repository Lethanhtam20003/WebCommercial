package com.nlu.WebThuongMai.dto.request.productReq;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderItemRequest implements Serializable {
    long productId;
    Integer quantity;
    BigDecimal unitPrice;
}