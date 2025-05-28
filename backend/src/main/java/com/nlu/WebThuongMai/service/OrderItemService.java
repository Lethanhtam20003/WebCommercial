package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.response.orderResp.OrderItemResponse;
import com.nlu.WebThuongMai.mapper.OrderMapper;
import com.nlu.WebThuongMai.model.OrderItem;
import com.nlu.WebThuongMai.repository.OrderItemRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderItemService {
    OrderItemRepository orderItemRepository;
    OrderMapper orderMapper;

    @PreAuthorize("hasAuthority('USER')")
    public Page<OrderItemResponse> getOrderItemByOrderId(Long orderId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderItem> orderItemsPage = orderItemRepository.findByOrderId(orderId, pageable);
        return orderItemsPage.map(orderMapper::toOrderItemResponse);
    }
}
