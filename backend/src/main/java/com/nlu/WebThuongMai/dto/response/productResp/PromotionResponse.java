package com.nlu.WebThuongMai.dto.response.productResp;

import lombok.*;
import lombok.experimental.FieldDefaults;

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
}
