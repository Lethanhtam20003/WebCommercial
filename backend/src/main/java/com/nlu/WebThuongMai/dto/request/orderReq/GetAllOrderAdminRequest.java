package com.nlu.WebThuongMai.dto.request.orderReq;

import com.nlu.WebThuongMai.enums.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetAllOrderAdminRequest {
    OrderStatus status;
    String username;
    LocalDate createdDateFrom;
    LocalDate createdDateTo;
    BigDecimal totalPrice;
}
