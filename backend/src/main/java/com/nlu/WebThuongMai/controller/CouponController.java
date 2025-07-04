package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.couponReq.CouponFilterAdminRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.CouponCreateRequest;
import com.nlu.WebThuongMai.dto.request.couponReq.CouponUpdateRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.couponResp.AdminCouponResponse;
import com.nlu.WebThuongMai.dto.response.couponResp.CouponResponse;
import com.nlu.WebThuongMai.service.CouponService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import com.nlu.WebThuongMai.dto.response.couponResp.GetAllCouponResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@RequestMapping("/v1/coupons")
public class CouponController {
    CouponService service;

    /**
     * Tạo mới một mã giảm giá
     *
     * @param request Thông tin mã giảm giá cần tạo
     * @return Thông tin mã giảm giá đã tạo
     */
    @PostMapping()
    public ApiResponse<CouponResponse> createCoupon(@RequestBody @Valid CouponCreateRequest request) {
        return ApiResponse.<CouponResponse>builder()
                .result(service.createCoupon(request))
                .build();
    }

//    /**
//     * Lấy tất cả các mã giảm giá đã tạo
//     *
//     * @return Danh sách mã giảm giá
//     */
//    @GetMapping("/all")
//    public ApiResponse<List<CouponResponse>> getAllCoupon() {
//        return ApiResponse.<List<CouponResponse>>builder()
//                .result(service.getAllCoupon())
//                .build();
//    }

    /**
     * Lấy mã giảm giá theo ID
     *
     * @param couponId ID của mã giảm giá cần tìm
     * @return Thông tin mã giảm giá tương ứng
     */
    @GetMapping("/{couponId}")
    public ApiResponse<CouponResponse> getCouponById(@PathVariable long couponId) {
        return ApiResponse.<CouponResponse>builder()
                .result(service.getCouponById(couponId))
                .build();
    }

    /**
     * Lấy mã giảm giá theo code
     *
     * @param code Code của mã giảm giá cần tìm
     * @return Thông tin mã giảm giá tương ứng
     */
    @GetMapping("/code/{code}")
    public ApiResponse<CouponResponse> getCouponByCode(@PathVariable String code) {
        return ApiResponse.<CouponResponse>builder()
                .result(service.getCouponByCode(code))
                .build();
    }

    /**
     * Cập nhật thông tin một mã giảm giá
     *
     * @param couponId ID của mã giảm giá cần cập nhật
     * @param request  Thông tin mã giảm giá cần cập nhật
     * @return Thông tin mã giảm giá đã cập nhật
     */
    @PutMapping("/{couponId}")
    public ApiResponse<CouponResponse> updateCoupon(@PathVariable long couponId, @RequestBody CouponUpdateRequest request) {
        return ApiResponse.<CouponResponse>builder()
                .result(service.updateCoupon(couponId, request))
                .build();
    }

    /**
     * Xóa một mã giảm giá theo ID
     *
     * @param couponId ID của mã giảm giá cần xóa
     * @return Kết quả xóa mã giảm giá
     */
    @DeleteMapping("/{couponId}")
    public ApiResponse<CouponResponse> deleteCoupon(@PathVariable long couponId) {
        return ApiResponse.<CouponResponse>builder()
                .result(service.deleteCoupon(couponId))
                .build();
    }

    @GetMapping("/user")
    public ApiResponse<Page<GetAllCouponResponse>> getAllCoupon(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.<Page<GetAllCouponResponse>>builder()
                .result(service.getAllCoupons(pageable))
                .build();
    }

    @PostMapping("/admin/filter")
    public ApiResponse<Page<AdminCouponResponse>> getAllCouponAdmin(
            @Valid @RequestBody() CouponFilterAdminRequest request,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.<Page<AdminCouponResponse>>builder()
                .result(service.getCouponsFilter(request, pageable))
                .build();
    }

    @GetMapping("/top5")
    public ApiResponse<List<GetAllCouponResponse>> getTop5Coupons() {
        return ApiResponse.<List<GetAllCouponResponse>>builder()
                .result(service.getTop5Coupons())
                .build();
    }

    @PostMapping("/save")
    public ApiResponse<String> saveCoupon(
            @RequestParam String couponCode,
            @RequestParam Long userId
    ) {
        service.saveCoupon(userId, couponCode);
        return ApiResponse.<String>builder()
                .result("Lưu     mã giảm giá thành công")
                .build();
    }
}
