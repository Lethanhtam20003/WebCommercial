package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.promotion.PromotionRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.couponResp.GetAllCouponResponse;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionResponse;
import com.nlu.WebThuongMai.service.PromotionService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)


@RestController
@RequestMapping("/v1/promotions")
public class PromotionController {
    PromotionService service;

    @GetMapping
    public ApiResponse<Page<PromotionResponse>> getListPromotion(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.<Page<PromotionResponse>>builder()
                .result(service.getListPromotion(pageable))
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
}
