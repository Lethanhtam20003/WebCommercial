package com.nlu.WebThuongMai.dto.response.couponResp;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminCouponResponse {
    Long id;
    String code;
    double discount;
    String description;
    int limitUsers;
    LocalDateTime createdAt;
    LocalDateTime expirationDate;
    CouponStatus status;
    CouponType type;
    BigDecimal priceCondition;
    BigDecimal minPrice;
}
