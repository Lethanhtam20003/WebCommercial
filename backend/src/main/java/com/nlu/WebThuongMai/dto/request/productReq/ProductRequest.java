package com.nlu.WebThuongMai.dto.request.productReq;

import com.nlu.WebThuongMai.model.Category;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    String name;
    String price;
    String description;
    String status;
    Set<Long> categoryIds;
}
