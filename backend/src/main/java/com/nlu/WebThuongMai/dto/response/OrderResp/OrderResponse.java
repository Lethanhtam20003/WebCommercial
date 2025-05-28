package com.nlu.WebThuongMai.dto.response.OrderResp;

import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.model.OrderItem;
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
    BigDecimal totalPrice;
    BigDecimal discountedPrice;
    OrderStatus status;
    String note;
    LocalDateTime createdDate;
    Set<OrderItemResponse> orderItems;
}
