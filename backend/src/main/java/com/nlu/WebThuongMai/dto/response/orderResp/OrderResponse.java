package com.nlu.WebThuongMai.dto.response.orderResp;

import com.nlu.WebThuongMai.dto.response.couponResp.CouponResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderItemResponse;
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
public class OrderResponse {
    long id;
    String userId;
    String userName;
    BigDecimal totalPrice;
    BigDecimal discountedPrice;
    OrderStatus status;
    String note;
    LocalDateTime createdDate;
    CouponResponse coupon;
    Set<OrderItemResponse> orderItems;
}
