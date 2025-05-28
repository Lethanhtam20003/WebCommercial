package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderCreatetionRequest;
import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderUpdateRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.productResp.PurchaseOrderResponse;
import com.nlu.WebThuongMai.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/purchase-orders")
public class PurchaseOrderController {
    private final PurchaseOrderService purchaseOrderService;

    /* *
     * Tạo mới một hóa đơn
     */
    @PostMapping()
    public ApiResponse<PurchaseOrderResponse> createPurchaseOrder(@RequestParam long supplierId, @RequestBody PurchaseOrderCreatetionRequest request) {
        return ApiResponse.<PurchaseOrderResponse>builder()
                .result(purchaseOrderService.createPurchaseOrder(supplierId, request))
                .build();
    }

    /* *
     * Lấy danh sách hóa đơn
     */
    @GetMapping()
    public ApiResponse<List<PurchaseOrderResponse>> getAllPurchaseOrder() {
        return ApiResponse.<List<PurchaseOrderResponse>>builder()
                .result(purchaseOrderService.getAllPurchaseOrder()).build();
    }

    /* *
     * Lấy thông tin một hóa đơn theo ID
     */
    @GetMapping("/{orderId}")
    public ApiResponse<PurchaseOrderResponse> getPurchaseOrderById(@PathVariable long orderId) {
        return ApiResponse.<PurchaseOrderResponse>builder()
                .result(purchaseOrderService.getPurchaseOrderById(orderId)).build();
    }

    /* *
     * Cập nhật thông tin một hóa đơn
     */
    @PutMapping("/{orderId}")
    public ApiResponse<PurchaseOrderResponse> updatePurchaseOrder(@PathVariable long orderId, @RequestBody PurchaseOrderUpdateRequest request) {
        return ApiResponse.<PurchaseOrderResponse>builder()
                .result(purchaseOrderService.updatePurchaseOrder(orderId, request))
                .build();
    }

    /* *
     * Xóa một hóa đơn theo ID
     */
    @DeleteMapping("/{orderId}")
    public ApiResponse<Boolean> deletePurchaseOrder(@PathVariable long orderId) {
        return ApiResponse.<Boolean>builder()
                .result(purchaseOrderService.deletePurchaseOrder(orderId))
                .build();
    }


}
