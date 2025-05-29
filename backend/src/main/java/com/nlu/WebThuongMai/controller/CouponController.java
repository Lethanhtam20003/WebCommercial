package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.couponResp.GetAllCouponResponse;
import com.nlu.WebThuongMai.service.CouponService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("v1/coupon-list")
public class CouponController {
    CouponService couponService;

    @GetMapping()
    @PreAuthorize("hasAuthority('USER')")
    public ApiResponse<Page<GetAllCouponResponse>> getOrderItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.<Page<GetAllCouponResponse>>builder()
                .result(couponService.getAllCoupons(pageable))
                .build();
    }

}
