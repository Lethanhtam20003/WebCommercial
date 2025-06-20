package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.orderResp.OrderItemResponse;
import com.nlu.WebThuongMai.model.OrderItem;
import com.nlu.WebThuongMai.model.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderItemMapper {
    /**
     * Chuyển đổi một OrderItem sang OrderItemResponse
     *
     * @param orderItem thực thể sản phẩm trong đơn hàng
     * @return đối tượng phản hồi OrderItemResponse
     */
    @Mapping(source = "product.images", target = "productImage", qualifiedByName = "mapFirstImage")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(target = "productId", source = "product.id")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    @Named("mapFirstImage")
    static String mapFirstImage(Set<ProductImage> images) {
        return images.stream()
                .findFirst()
                .map(ProductImage::getImage)
                .orElse(null);
    }
}
