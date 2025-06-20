package com.nlu.WebThuongMai.dto.request.couponReq;

import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import jakarta.validation.constraints.*;
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

    @NotNull(message = "DISCOUNT_NOT_NULL")
    @DecimalMin(value = "0.0", inclusive = false, message = "Phần trăm giảm phải lớn hơn 0")
    @DecimalMax(value = "1.0", inclusive = true, message = "Phần trăm giảm không vượt quá 100%")
    Double discount;

    @NotBlank(message = "DESCRIPTION_NOT_NULL")
    @Size(min = 5, max = 2555, message = "Mô tả phải có độ dài từ 5 đến 2555 ký tự")
    String description;

    @Min(value = 1, message = "Số lượt sử dụng phải lớn hơn 0")
    int limitUsers;

    @NotNull(message = "EXPIRATION_DATE_NOT_NULL")
    @Future(message = "Ngày hết hạn phải nằm trong tương lai")
    LocalDateTime expirationDate;

    @NotNull(message = "STATUS_NOT_NULL")
    CouponStatus status;

    @NotNull(message = "TYPE_NOT_NULL")
    CouponType type;

    @NotNull(message = "PRICE_CONDITION_NOT_NULL")
    @DecimalMin(value = "0.0", inclusive = true, message = "Giá điều kiện không được nhỏ hơn 0")
    BigDecimal priceCondition;

    @NotNull(message = "MIN_PRICE_NOT_NULL")
    @DecimalMin(value = "0.0", inclusive = true, message = "Giá tối thiểu không được nhỏ hơn 0")
    @DecimalMax(value = "50000.0", message = "Giá tối thiểu không được lớn hơn 50000")
    BigDecimal minPrice;
}
