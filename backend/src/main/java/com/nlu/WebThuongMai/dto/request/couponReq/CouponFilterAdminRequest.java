package com.nlu.WebThuongMai.dto.request.couponReq;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
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
    String code;
    CouponStatus status;
    Double minDiscount;
    LocalDate createdAt;

    BigDecimal minPrice;
    BigDecimal priceCondition;
    CouponType type;
}