package com.nlu.WebThuongMai.dto.response.promotion;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PromotionAdminResponse {
    Long promotionId;
    String name;
    Double discountPercent;
    LocalDate startDate;
    LocalDate endDate;
    String description;
    String image;
}
