package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.orderReq.OrderCreateRequest;
import com.nlu.WebThuongMai.dto.response.OrderResp.OrderResponse;
import com.nlu.WebThuongMai.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
uses= OrderItemMapper.class)
public interface OrderMapper {
    @Mapping(target = "orderItems", source = "orderItems")
    OrderResponse toOrderResponse(Order save);

    Order toOrder(OrderCreateRequest request);

}
