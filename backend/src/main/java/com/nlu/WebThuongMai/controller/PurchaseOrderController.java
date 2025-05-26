package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.productReq.PurchaseOrderRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.productResp.PurchaseOrderResponse;
import com.nlu.WebThuongMai.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/purchase-orders")
public class PurchaseOrderController {
    private final PurchaseOrderService purchaseOrderService;

    @PostMapping()
    public ApiResponse<PurchaseOrderResponse> createPurchaseOrder(@RequestParam long supplierId, @RequestBody PurchaseOrderRequest request ){
        return ApiResponse.<PurchaseOrderResponse>builder()
                .result(purchaseOrderService.createPurchaseOrder(supplierId,request))
                .build();
    }


}
