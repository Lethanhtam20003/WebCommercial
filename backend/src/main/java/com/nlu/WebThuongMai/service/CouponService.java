package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.response.couponResp.GetAllCouponResponse;
import com.nlu.WebThuongMai.mapper.CouponMapper;
import com.nlu.WebThuongMai.model.Coupon;
import com.nlu.WebThuongMai.repository.CouponRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CouponService {
    CouponRepository couponRepository;
    CouponMapper couponMapper;

    public Page<GetAllCouponResponse> getAllCoupons(Pageable pageable) {
        Page<Coupon> couponPage = couponRepository.findAll(pageable);
        return couponPage.map(couponMapper::toGetAllCouponResponse);
    }
}
