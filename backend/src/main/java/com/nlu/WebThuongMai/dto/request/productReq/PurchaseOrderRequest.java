package com.nlu.WebThuongMai.dto.request.productReq;

import com.nlu.WebThuongMai.enums.PurchaseStatus;
import com.nlu.WebThuongMai.model.Supplier;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PurchaseOrderRequest {
    @NotNull
    LocalDateTime createdAt;
    @NotNull
    PurchaseStatus status;
    @NotNull
    BigDecimal totalPrice;

    Set<PurchaseOrderItemRequest> items;
}
