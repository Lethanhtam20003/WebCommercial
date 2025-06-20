package com.nlu.WebThuongMai.dto.request.orderReq;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nlu.WebThuongMai.dto.request.PageRequest.PaginationRequest;
import com.nlu.WebThuongMai.enums.OrderStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(callSuper = true)
public class GetAllOrderAdminRequest extends PaginationRequest {
    OrderStatus status;

    String username;

    LocalDate createdDateFrom;

    LocalDate createdDateTo;

    @DecimalMin(value = "0.0", inclusive = true, message = "Tổng tiền phải >= 0")
    BigDecimal totalPrice;
}
