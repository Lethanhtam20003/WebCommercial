package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.orderReq.OrderFilterRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.orderResp.OrderResponse;
import com.nlu.WebThuongMai.enums.OrderStatus;
import com.nlu.WebThuongMai.service.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("/v1/orders")
public class OrderController {

    OrderService orderService;
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("{userId}")
    public ApiResponse<List<OrderResponse>> getOrdersForUser(@PathVariable Long userId) {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrdersById(userId))
                .build();
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping()
    public ApiResponse<List<OrderResponse>> getOrdersByUserIdAndStatus(@RequestBody OrderFilterRequest orderFilterRequest) {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.findOrdersByUserIdAndStatus(orderFilterRequest))
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
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/filter/admin")
    public ApiResponse<List<OrderResponse>> getAdminOrders(@RequestBody OrderFilterRequest request) {
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.filterOrdersByAdmin(request))
                .build();
    }
}
