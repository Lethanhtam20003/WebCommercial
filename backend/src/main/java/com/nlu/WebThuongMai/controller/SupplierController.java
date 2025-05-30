package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.productReq.SupplierRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.productResp.SupplierResponse;
import com.nlu.WebThuongMai.service.SupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/supplier")
public class SupplierController {
    private final SupplierService supplierService;

    /* *
     * Tạo mới một nhà cung cấp
     */
    @PostMapping()
    public ApiResponse<SupplierResponse> createSupplier(@RequestBody @Valid SupplierRequest request) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.createSupplier(request))
                .build();
    }

    /* *
     * Lấy thông tin tất cả các nhà cung cấp
     */
    @GetMapping()
    public ApiResponse<Page<SupplierResponse>> getAllSupplier(Pageable pageable) {
        return ApiResponse.<Page<SupplierResponse>>builder()
                .result(supplierService.getAllSupplier(pageable))
                .build();
    }

    /* *
     * Lấy thông tin một nhà cung cấp theo ID
     */
    @GetMapping("/{supplierId}")
    public ApiResponse<SupplierResponse> getSupplierById(@PathVariable long supplierId) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.getSupplierById(supplierId)).build();
    }

    /* *
     * Cập nhật thông tin một nhà cung cấp
     */
    @PutMapping("/{supplierId}")
    public ApiResponse<SupplierResponse> updateSupplier(@PathVariable long supplierId, @RequestBody SupplierRequest request) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.updateSupplier(supplierId, request))
                .build();
    }
}
