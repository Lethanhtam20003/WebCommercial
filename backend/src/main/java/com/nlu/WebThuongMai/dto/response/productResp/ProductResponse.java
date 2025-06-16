package com.nlu.WebThuongMai.dto.response.productResp;

import com.nlu.WebThuongMai.dto.response.promotion.PromotionResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    long id;
    String name;
    double price;
    String status;
    Set<CategoryResponse> categories;
    String description;
    Set<String> images;
    int hot;
    Set<PromotionResponse> promotions;
}
