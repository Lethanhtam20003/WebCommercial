package com.nlu.WebThuongMai.dto.response.OrderResp;

import com.nlu.WebThuongMai.enums.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Long id;
    BigDecimal totalPrice;
    BigDecimal discountedPrice;
    OrderStatus status;
    String note;
    LocalDateTime createdDate;
    Set<OrderItemResponse> orderItems;
}
