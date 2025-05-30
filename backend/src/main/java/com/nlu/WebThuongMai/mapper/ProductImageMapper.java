package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.productResp.ProductImageResponse;
import com.nlu.WebThuongMai.model.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "image", source = "url")
    ProductImage toProductImage(ProductImageResponse response);

    @Mapping(target = "url", source = "image")
    ProductImageResponse toProductImageResponse(ProductImage image);
}
