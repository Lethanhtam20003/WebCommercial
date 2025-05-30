package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.model.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderItemMapper {
    @Mapping(target = "productId", source = "product.id")
    OrderItemResponse toOrderItemResponse(OrderItem item);
}
