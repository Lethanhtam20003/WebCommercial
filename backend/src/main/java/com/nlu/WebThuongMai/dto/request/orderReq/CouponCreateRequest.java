package com.nlu.WebThuongMai.dto.request.orderReq;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import jakarta.validation.constraints.*;
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
public class CouponCreateRequest {
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    @Size(min = 10, max = 40, message = "FIELD_COUPONS_SIZE_INVALID_10_40")
    String code;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    @DecimalMin(value = "0.0", inclusive = false, message = "DISCOUNT_COUPONS_MUST_BE_POSITIVE")
    Double discount;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    @Size(min = 5, max = 2555, message = "DESCRIPTION_COUPONS_SIZE_INVALID")
    String description;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    @Min(value = 1, message = "LIMIT_USERS_COUPONS_MUST_BE_POSITIVE")
    int limitUsers;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    LocalDateTime createdAt;
    @Future(message = "EXPIRATION_DATE_COUPONS_MUST_BE_IN_FUTURE")
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    LocalDateTime expirationDate;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    CouponStatus status;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    CouponType type;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    @DecimalMin(value = "0.0", message = "PRICE_CONDITION_COUPONS_MUST_BE_POSITIVE")
    BigDecimal priceCondition;
    @NotNull(message = "FIELD_CAN_NOT_BE_NULL")
    @DecimalMin(value = "0.0", message = "MIN_PRICE_COUPONS_MUST_BE_POSITIVE")
    @DecimalMax(value = "50000.0", message = "MIN_PRICE_COUPONS_MUST_BE_LESS_THAN_50000")
    BigDecimal minPrice;

}
