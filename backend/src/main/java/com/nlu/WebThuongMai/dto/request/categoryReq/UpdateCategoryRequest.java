package com.nlu.WebThuongMai.dto.request.categoryReq;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateCategoryRequest {

    @NotBlank(message = "Tên danh mục không được để trống")
    String name;

    @NotBlank(message = "URL hình ảnh không được để trống")
    String imageUrl;

    String description;
}
