package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.orderReq.OrderFilterRequest;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.mapper.OrderMapper;
import com.nlu.WebThuongMai.model.Order;
import com.nlu.WebThuongMai.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;

    @PreAuthorize("hasAuthority('USER')")
    public List<OrderResponse> findOrdersByUserIdAndStatus(OrderFilterRequest orderFilterRequest) {
        List<Order> orders = orderRepository.findOrdersByUserIdAndStatus(orderFilterRequest.getUserId(), orderFilterRequest.getStatus());

        return orderMapper.toOrderResponseList(orders);
    }

    @PreAuthorize("hasAuthority('USER')")
    public List<OrderResponse> getOrdersById(Long userId) {
        List<Order> orders = orderRepository.findOrdersByUserId(userId);

        return orderMapper.toOrderResponseList(orders);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public List<OrderResponse> filterOrdersByAdmin(OrderFilterRequest request) {
        List<Order> orders;

        if (request.getStatus() != null) {
            orders = orderRepository.findOrdersByStatus(request.getStatus());
        } else {
            orders = orderRepository.findAll();
        }

        return orderMapper.toOrderResponseList(orders);
    }
}
