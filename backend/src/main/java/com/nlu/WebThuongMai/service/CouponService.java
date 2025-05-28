package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.orderReq.CouponCreateRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.CouponRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.CouponUpdateRequest;
import com.nlu.WebThuongMai.dto.response.OrderResp.CouponResponse;
import com.nlu.WebThuongMai.enums.CouponType;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.CouponMapper;
import com.nlu.WebThuongMai.model.Coupon;
import com.nlu.WebThuongMai.repository.CouponRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class CouponService {
    CouponRepository repository;
    CouponMapper mapper;



    public CouponResponse createCoupon(CouponCreateRequest request) {
        Coupon coupon = repository.findByCode(request.getCode())
                .orElse(null);
        if (coupon != null)
            throw new AppException(ErrorCode.COUPON_ALREADY_EXISTED);

        return mapper.toCouponResponse(repository.save(mapper.toCoupon(request)));
    }

    public List<CouponResponse> getAllCoupon() {
        return mapper.toListCouponResponse(repository.findAll());
    }

    public CouponResponse getCouponById(long couponId) {
        return mapper.toCouponResponse(repository.findById(couponId)
                .orElseThrow(() -> new AppException(ErrorCode.COUPON_NOT_FOUND)));
    }

    public CouponResponse updateCoupon(long couponId, CouponUpdateRequest request) {
        Coupon coupon = repository.findById(couponId)
                .orElseThrow(() -> new AppException(ErrorCode.COUPON_NOT_FOUND));
        coupon.setStatus(request.getStatus());
        coupon.setType(request.getType());
        coupon.setDiscount(request.getDiscount());
        coupon.setDescription(request.getDescription());
        coupon.setExpirationDate(request.getExpirationDate());
        coupon.setLimitUsers(request.getLimitUsers());
        coupon.setPriceCondition( request.getPriceCondition());
        coupon.setMinPrice(request.getMinPrice());

        return mapper.toCouponResponse(repository.save(coupon));
    }

    public Boolean deleteCoupon(long couponId) {
        var coupon = repository.findById(couponId).orElseThrow(() -> new AppException(ErrorCode.COUPON_NOT_FOUND));
        repository.deleteById(couponId);
        return true;
    }

    public CouponResponse getCouponByCode(String code) {
        return mapper.toCouponResponse(repository.findByCode(code)
                .orElseThrow(() -> new AppException(ErrorCode.COUPON_NOT_FOUND)));
    }

    public BigDecimal applyCouponIfPresent(BigDecimal total, CouponRequest couponReq) {
        if (couponReq == null) return total;

        Coupon coupon = mapper.couponResponseToCoupon(getCouponByCode(couponReq.getCode()));
        BigDecimal discountAmount = BigDecimal.ZERO;

        if (coupon.getType() == CouponType.PERCENTAGE) {
            discountAmount = total.multiply(BigDecimal.valueOf(coupon.getDiscount()))
                    .setScale(2, RoundingMode.HALF_UP);
        } else if (coupon.getType() == CouponType.AMOUNT) {
            discountAmount = BigDecimal.valueOf(coupon.getDiscount());
        }

        return total.subtract(discountAmount).max(BigDecimal.ZERO);
    }
}
