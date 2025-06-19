package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.orderReq.GetAllOrderAdminRequest;
import com.nlu.WebThuongMai.dto.request.promotion.FilterPromotionRequest;
import com.nlu.WebThuongMai.dto.request.promotion.PromotionRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.couponResp.GetAllCouponResponse;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionAdminResponse;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionResponse;
import com.nlu.WebThuongMai.service.PromotionService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)


@RestController
@Slf4j
@RequestMapping("/v1/promotions")
public class PromotionController {
    PromotionService service;

    @GetMapping
    public ApiResponse<List<PromotionResponse>> getListPromotion() {
        return ApiResponse.<List<PromotionResponse>>builder()
                .result(service.getListPromotion())
                .build();
    }

    @PostMapping
    public ApiResponse<PromotionResponse> createPromotion(@RequestBody @Valid PromotionRequest request) {
        return ApiResponse.<PromotionResponse>builder()
                .result(service.createPromotion(request))
                .build();
    }

    @GetMapping("/active-promotions")
    public ApiResponse<List<PromotionResponse>> getActivePromotion() {
        return ApiResponse.<List<PromotionResponse>>builder()
                .result(service.getActivePromotionList())
                .build();
    }

    @PostMapping("/filter")
    public ApiResponse<Page<PromotionAdminResponse>> filterPromotionAdmin(
            @Valid @RequestBody(required = false) FilterPromotionRequest request
    ) {
        if (request == null) {
            request = new FilterPromotionRequest();
        }

        request.setDefaultSortField("promotionId");
        Pageable pageable = request.toPageable();
        return ApiResponse.<Page<PromotionAdminResponse>>builder()
                .result(service.filterPromotionsByAdmin(request, pageable))
                .build();
    }
}
