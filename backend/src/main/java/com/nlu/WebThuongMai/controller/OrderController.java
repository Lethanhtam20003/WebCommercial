package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("/v1/orders")
public class OrderController {
    OrderService orderService = new OrderService();
    /**
     * Lấy danh sách giỏ hàng theo trạng thái.
     *
     * @param status Trạng thái của đơn hàng cần lấy (VD: PENDING, COMPLETED, CANCELLED)
     * @return ApiResponse chứa danh sách các đơn hàng theo trạng thái
     */
    @GetMapping("/carts")
    public ApiResponse<List<OrderResponse>> getOrdersByStatus(@RequestParam OrderStatus status) {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrdersByStatus(status))
                .build();
    }
}
