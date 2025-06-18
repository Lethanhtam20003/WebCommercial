package com.nlu.WebThuongMai.dto.request.productReq;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryUpdateRequest {
    Long id;
    private String name;
    String imageUrl;
    private String description;
}
