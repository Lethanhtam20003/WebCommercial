package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.orderReq.OrderCreateRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderUpdateRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.OrderResp.OrderResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.service.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("/v1/orders")
class OrderController {
    OrderService service;

    // tạo đơn hàng
    @PostMapping()
    public ApiResponse<OrderResponse> createOrder(@RequestBody @Valid OrderCreateRequest request){
        return ApiResponse.<OrderResponse>builder()
                .result(service.createOrder(request))
                .build();
    }
    // xác nhận đơn hàng pending -> confirmed
    @PutMapping("/{orderId}/confirm")
    public ApiResponse<OrderResponse> confirmOrder(@PathVariable long orderId){
        return ApiResponse.<OrderResponse>builder()
                .result(service.confirmOrder(orderId))
                .build();
    }
    // xác nhận đơn hàng confirmed -> shipped
    @PutMapping("/{orderId}/shipped")
    public ApiResponse<OrderResponse> shippedOrder(@PathVariable long orderId){
        return ApiResponse.<OrderResponse>builder()
                .result(service.shippedOrder(orderId))
                .build();
    }
    // xác nhận đơn hàng shipped -> delivered
    @PutMapping("/{orderId}/delivered")
    public ApiResponse<OrderResponse> deliveredOrder(@PathVariable long orderId){
        return ApiResponse.<OrderResponse>builder()
                .result(service.deliveredOrder(orderId))
                .build();
    }
    // huy don hang
    @PutMapping("/{orderId}/cancel")
    public ApiResponse<OrderResponse> cancelOrder(@PathVariable long orderId){
        return ApiResponse.<OrderResponse>builder()
                .result(service.cancelOrder(orderId))
                .build();
    }
    // cập nhật đơn hàng
    @PutMapping("/{orderId}")
    public ApiResponse<OrderResponse> updateOrder(@PathVariable long orderId,@RequestBody OrderUpdateRequest request){
        return ApiResponse.<OrderResponse>builder()
                .result(service.updateOrder(orderId,request))
                .build();
    }
    // lấy danh sách đơn hàng


    // lấy đơn hàng theo id

    // lấy chi tiết đơn hàng

    // xóa đơn hàng
    @DeleteMapping("/{orderId}")
    public ApiResponse<Boolean> deleteOrder(@PathVariable long orderId){
        return ApiResponse.<Boolean>builder()
                .result(service.deleteOrder(orderId))
                .build();
    }

    // thêm sản phẩm vào đơn hàng

    // xóa sản phẩm khỏi đơn hàng


    // tìm kiếm đơn hàng theo tên



}
