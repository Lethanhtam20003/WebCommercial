package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.orderResp.OrderItemResponse;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderResponse;
import com.nlu.WebThuongMai.model.Order;
import com.nlu.WebThuongMai.model.OrderItem;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {

    /**
     * Chuyển đổi một Order sang OrderResponse
     *
     * @param order thực thể đơn hàng
     * @return đối tượng phản hồi OrderResponse
     */
    OrderResponse toOrderResponse(Order order);

    /**
     * Chuyển đổi danh sách Order sang danh sách OrderResponse
     *
     * @param orders danh sách đơn hàng
     * @return danh sách phản hồi OrderResponse
     */
    List<OrderResponse> toOrderResponseList(List<Order> orders);

    /**
     * Chuyển đổi một OrderItem sang OrderItemResponse
     *
     * @param orderItem thực thể sản phẩm trong đơn hàng
     * @return đối tượng phản hồi OrderItemResponse
     */
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);

    /**
     * Chuyển đổi danh sách OrderItem sang danh sách OrderItemResponse
     *
     * @param items danh sách sản phẩm trong đơn hàng
     * @return danh sách phản hồi OrderItemResponse
     */
    List<OrderItemResponse> toOrderItemResponseList(List<OrderItem> items);
}
