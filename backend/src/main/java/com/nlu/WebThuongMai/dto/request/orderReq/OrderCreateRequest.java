package com.nlu.WebThuongMai.dto.request.orderReq;

import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.model.OrderItem;
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
public class OrderCreateRequest {
    @NotNull
    long userId;
    String note;
    LocalDateTime createdDate;
    Set<OrderItemRequest> orderItems;
    CouponRequest coupon;
}
