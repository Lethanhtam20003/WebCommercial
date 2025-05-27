package com.nlu.WebThuongMai.dto.response.orderResp;

import com.nlu.WebThuongMai.enums.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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
    List<OrderItemResponse> orderItems;
}
