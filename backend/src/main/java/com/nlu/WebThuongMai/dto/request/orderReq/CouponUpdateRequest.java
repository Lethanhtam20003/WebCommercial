package com.nlu.WebThuongMai.dto.request.orderReq;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponUpdateRequest {
    Double discount;
    String description;
    int limitUsers;
    LocalDateTime expirationDate;
    CouponStatus status;
    CouponType type;
    BigDecimal priceCondition;
    BigDecimal minPrice;


}
