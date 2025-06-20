package com.nlu.WebThuongMai.dto.request.orderReq;

import com.nlu.WebThuongMai.dto.request.PageRequest.PaginationRequest;
import com.nlu.WebThuongMai.enums.OrderStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class OrderFilterRequest extends PaginationRequest {
    @Min(value = 1, message = "User ID phải >= 1")
    Long userId;
    OrderStatus status;
}
