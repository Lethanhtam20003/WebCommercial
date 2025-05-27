package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.response.orderResp.OrderResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.mapper.OrderMapper;
import com.nlu.WebThuongMai.model.Order;
import com.nlu.WebThuongMai.repository.OrderRepository;

import java.util.List;

public class OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;

    public List<OrderResponse> getOrdersByStatus(OrderStatus status) {
        List<Order> orders = orderRepository.findByStatus(status);
        return orderMapper.toOrderResponseList(orders);
    }
}
