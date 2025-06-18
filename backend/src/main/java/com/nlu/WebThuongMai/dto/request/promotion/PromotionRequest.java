package com.nlu.WebThuongMai.dto.request.promotion;

import com.nlu.WebThuongMai.validator.promotion.ValidDateRange;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@ValidDateRange
public class PromotionRequest {
    @NotBlank(message = "NAME_NOT_NULL")
    String name;

    @NotNull(message = "DISCOUNT_PERCENT_NOT_NULL")
    @DecimalMin(value = "0.0", inclusive = true, message = "Phần trăm giảm giá không được nhỏ hơn 0")
    @DecimalMax(value = "100.0", inclusive = true, message = "Phần trăm giảm giá không được lớn hơn 100")
    Double discountPercent;

    @NotNull(message = "START_DATE_NOT_NULL")
    LocalDate startDate;

    @NotNull(message = "END_DATE_NOT_NULL")
    LocalDate endDate;

    String description;


    @Pattern(regexp = "^(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)$",
            message = "Ảnh phải là URL hợp lệ và có định dạng hình ảnh")
    String image;
}
