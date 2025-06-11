package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.productResp.ProductImageResponse;
import com.nlu.WebThuongMai.model.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {

    // Map một ProductImage sang chuỗi (url)
    default String map(ProductImage image) {
        return image.getImage();
    }

    // Map tập hợp
    default Set<String> map(Set<ProductImage> images) {
        if (images == null) return Set.of();
        return images.stream().map(this::map).collect(Collectors.toSet());
    }
}
