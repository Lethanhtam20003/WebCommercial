package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.productResp.InventoryResponse;
import com.nlu.WebThuongMai.model.Inventory;
import com.nlu.WebThuongMai.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RequiredArgsConstructor

@RestController
@RequestMapping("/v1/inventory")
public class InventoryController {
    private final InventoryService service;

    @GetMapping()
    public ApiResponse<Page<InventoryResponse>> getAllInventory(
            Pageable pageable
    ) {
        return ApiResponse.<Page<InventoryResponse>>builder()
                .result(service.getAllInventory(pageable))
                .build();
    }


}
