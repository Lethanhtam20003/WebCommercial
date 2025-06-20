package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.PageRequest.PaginationRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.GetAllOrderAdminRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderCreateRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderUpdateRequest;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderResponse;
import com.nlu.WebThuongMai.dto.request.orderReq.OrderFilterRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.service.OrderService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("/v1/orders")
class OrderController {
    OrderService service;

    // tạo đơn hàng
    @PostMapping("/create")
    public ApiResponse<OrderResponse> createOrder(@RequestBody @Valid OrderCreateRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .result(service.createOrder(request))
                .build();
    }

    // xác nhận đơn hàng pending -> confirmed
    @PutMapping("/{orderId}/confirm")
    public ApiResponse<OrderResponse> confirmOrder(@PathVariable long orderId) {
        return ApiResponse.<OrderResponse>builder()
                .result(service.confirmOrder(orderId))
                .build();
    }

    // xác nhận đơn hàng confirmed -> shipped
    @PutMapping("/{orderId}/shipped")
    public ApiResponse<OrderResponse> shippedOrder(@PathVariable long orderId) {
        return ApiResponse.<OrderResponse>builder()
                .result(service.shippedOrder(orderId))
                .build();
    }

    // xác nhận đơn hàng shipped -> delivered
    @PutMapping("/{orderId}/delivered")
    public ApiResponse<OrderResponse> deliveredOrder(@PathVariable long orderId) {
        return ApiResponse.<OrderResponse>builder()
                .result(service.deliveredOrder(orderId))
                .build();
    }

    // huy don hang
    @PutMapping("/{orderId}/cancel")
    public ApiResponse<OrderResponse> cancelOrder(@PathVariable long orderId) {
        return ApiResponse.<OrderResponse>builder()
                .result(service.cancelOrder(orderId))
                .build();
    }

    // cập nhật đơn hàng
    @PutMapping("/{orderId}")
    public ApiResponse<OrderResponse> updateOrder(@PathVariable long orderId, @RequestBody OrderUpdateRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .result(service.updateOrder(orderId, request))
                .build();
    }
    // lấy danh sách đơn hàng


    // lấy đơn hàng theo id

    // lấy chi tiết đơn hàng

    // xóa đơn hàng
    @DeleteMapping("/{orderId}")
    public ApiResponse<Boolean> deleteOrder(@PathVariable long orderId) {
        return ApiResponse.<Boolean>builder()
                .result(service.deleteOrder(orderId))
                .build();
    }

    // thêm sản phẩm vào đơn hàng

    // xóa sản phẩm khỏi đơn hàng


    // tìm kiếm đơn hàng theo tên


    @GetMapping()
    public ApiResponse<Page<OrderResponse>> getOrdersForUser(
            @Valid @RequestParam Long userId,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.<Page<OrderResponse>>builder()
                .result(service.getOrdersById(userId, pageable))
                .build();
    }

    @GetMapping("/{orderId}")
    public ApiResponse<OrderResponse> getOrdersById(@PathVariable long orderId) {
        return ApiResponse.<OrderResponse>builder()
                .result(service.getById(orderId))
                .build();
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping()
    public ApiResponse<Page<OrderResponse>> getOrdersByUserIdAndStatus(
            @Valid @RequestBody OrderFilterRequest request
    ) {
        return ApiResponse.<Page<OrderResponse>>builder()
                .result(service.findOrdersByUserIdAndStatus(request))
                .build();
    }

    /**
     * Lọc danh sách đơn hàng theo trạng thái hoặc toàn bộ đơn hàng cho admin.
     * Chỉ người dùng có quyền 'ADMIN' mới được phép truy cập endpoint này.
     * Nếu không truyền status, sẽ trả về toàn bộ đơn hàng.
     *
     * @param request Đối tượng chứa trạng thái đơn hàng để lọc (có thể null).
     * @return ApiResponse chứa danh sách các đơn hàng phù hợp.
     */
    @PostMapping("/filter/admin")
    public ApiResponse<Page<OrderResponse>> getAdminOrders(
            @Valid @RequestBody GetAllOrderAdminRequest request) {
        return ApiResponse.<Page<OrderResponse>>builder()
                .result(service.filterOrdersByAdmin(request))
                .build();
    }
}
