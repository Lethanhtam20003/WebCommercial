package com.nlu.WebThuongMai.dto.response.couponResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GetAllCouponResponse {
    Long id;
    String code;
    double discount;
    String description;
    LocalDateTime expirationDate;
}
