package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.productResp.ProductImageResponse;
import com.nlu.WebThuongMai.model.ProductImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    ProductImage toProductImage(ProductImageResponse response);
    ProductImageResponse toProductImageResponse(ProductImage image);
}
