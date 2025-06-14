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
public class PromotionResponse {
    Long promotionId;

    String name;

    Double discountPercent;

    String image;

    private LocalDate startDate;
    private LocalDate endDate;
}
