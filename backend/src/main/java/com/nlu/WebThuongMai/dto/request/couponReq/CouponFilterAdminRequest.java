package com.nlu.WebThuongMai.dto.request.couponReq;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponFilterAdminRequest {
    @Size(min = 3, max = 50, message = "Mã coupon phải từ 3 đến 50 ký tự")
    String code;
    CouponStatus status;
    @DecimalMin(value = "0.0", inclusive = true, message = "Giảm giá tối thiểu phải >= 0")
    @DecimalMax(value = "100.0", inclusive = true, message = "Giảm giá tối đa là 100%")
    Double minDiscount;
    @PastOrPresent(message = "Ngày tạo phải là hôm nay hoặc trước đó")
    LocalDate createdAt;

    @DecimalMin(value = "0.0", inclusive = true, message = "Giá trị đơn hàng tối thiểu phải >= 0")
    BigDecimal minPrice;

    @DecimalMin(value = "0.0", inclusive = true, message = "Điều kiện giá phải >= 0")
    BigDecimal priceCondition;

    CouponType type;
}