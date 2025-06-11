package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderItemResponse;
import com.nlu.WebThuongMai.service.OrderItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("v1/order-items")
public class OrderItemController {
    OrderItemService orderItemService;

    @GetMapping()
    @PreAuthorize("hasAuthority('USER')")
    public ApiResponse<Page<OrderItemResponse>> getOrderItems(
            @RequestParam Long orderId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<Page<OrderItemResponse>>builder()
                .result(orderItemService.getOrderItemByOrderId(orderId, page, size))
                .build();
    }
}
