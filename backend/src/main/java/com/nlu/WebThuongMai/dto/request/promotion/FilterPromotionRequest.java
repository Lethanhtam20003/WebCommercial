package com.nlu.WebThuongMai.dto.request.promotion;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FilterPromotionRequest {
    String name;
    String startDateFrom;
    String endDateTo;
    String minDiscount;
}
