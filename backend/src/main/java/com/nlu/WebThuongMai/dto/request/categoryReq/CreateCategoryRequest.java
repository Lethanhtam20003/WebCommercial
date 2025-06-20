package com.nlu.WebThuongMai.dto.request.categoryReq;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateCategoryRequest {
    @NotBlank(message = "Tên danh mục không được để trống")
    @Size(max = 100, message = "Tên danh mục tối đa 100 ký tự")
    String name;

    @Size(max = 255, message = "URL hình ảnh tối đa 255 ký tự")
    String imageUrl;

    @Size(max = 500, message = "Mô tả danh mục tối đa 500 ký tự")
    String description;
}
