package com.nlu.WebThuongMai.dto.response.productResp;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    long id;
    String name;
    String imageUrl;
    String description;
}
