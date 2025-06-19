package com.nlu.WebThuongMai.dto.request.orderReq;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

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
    String address;
    Set<OrderItemRequest> orderItems;
    CouponRequest coupon;
}
