package com.nlu.WebThuongMai.dto.response.productResp;

import com.nlu.WebThuongMai.enums.PurchaseStatus;
import com.nlu.WebThuongMai.model.Supplier;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * tiếng viêt
 */
@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderResponse {
    Long id;
    Supplier supplier;
    LocalDateTime createdAt;
    PurchaseStatus status;
    BigDecimal totalPrice;
    Set<PurchaseOrderItemResponse> items;
}
