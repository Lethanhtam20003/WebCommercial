package com.nlu.WebThuongMai.dto.response.OrderResp;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponResponse {
    long id;
    String code;
    Double discount;
    String description;
    int limitUsers;
    LocalDateTime createdAt;
    LocalDateTime expirationDate;
    CouponStatus status;
    CouponType type;
    BigDecimal priceCondition;
    BigDecimal minPrice;
}
