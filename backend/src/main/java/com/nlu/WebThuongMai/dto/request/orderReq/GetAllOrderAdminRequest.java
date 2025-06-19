package com.nlu.WebThuongMai.dto.request.orderReq;

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
public class GetAllOrderAdminRequest extends PaginationRequest {
    OrderStatus status;

    @Size(min = 3, max = 50, message = "Username phải có độ dài từ 3 đến 50 ký tự")
    String username;

    @PastOrPresent(message = "Ngày bắt đầu không được lớn hơn hôm nay")
    LocalDate createdDateFrom;

    @PastOrPresent(message = "Ngày kết thúc không được lớn hơn hôm nay")
    LocalDate createdDateTo;

    @DecimalMin(value = "0.0", inclusive = true, message = "Tổng tiền phải >= 0")
    BigDecimal totalPrice;
}
