package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.couponReq.CouponFilterAdminRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.CouponCreateRequest;
import com.nlu.WebThuongMai.dto.request.orderReq.CouponRequest;
import com.nlu.WebThuongMai.dto.request.couponReq.CouponUpdateRequest;
import com.nlu.WebThuongMai.dto.response.couponResp.AdminCouponResponse;
import com.nlu.WebThuongMai.dto.response.couponResp.CouponResponse;
import com.nlu.WebThuongMai.enums.CouponStatus;
import com.nlu.WebThuongMai.enums.CouponType;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.dto.response.couponResp.GetAllCouponResponse;
import com.nlu.WebThuongMai.mapper.CouponMapper;
import com.nlu.WebThuongMai.model.Coupon;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.CouponRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class CouponService {
    CouponRepository repository;
    CouponMapper mapper;
    UserService userService;


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

    @PreAuthorize("hasAuthority('ADMIN')")
    public CouponResponse updateCoupon(long couponId, CouponUpdateRequest request) {
        Coupon coupon = repository.findById(couponId)
                .orElseThrow(() -> new AppException(ErrorCode.COUPON_NOT_FOUND));
        coupon.setStatus(request.getStatus());
        coupon.setType(request.getType());
        coupon.setDiscount(request.getDiscount());
        coupon.setDescription(request.getDescription());
        coupon.setExpirationDate(request.getExpirationDate());
        coupon.setLimitUsers(request.getLimitUsers());
        coupon.setPriceCondition(request.getPriceCondition());
        coupon.setMinPrice(request.getMinPrice());

        return mapper.toCouponResponse(repository.save(coupon));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public CouponResponse deleteCoupon(long couponId) {
        Coupon coupon = repository.findById(couponId).orElseThrow(() -> new AppException(ErrorCode.COUPON_NOT_FOUND));
        coupon.setStatus(CouponStatus.DELETED);

        return mapper.toCouponResponse(repository.save(coupon));
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

    @PreAuthorize("hasAuthority('USER')")
    public Page<GetAllCouponResponse> getAllCoupons(Pageable pageable) {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        User user = userService.findUserByUsername(username);

        List<String> couponCodes = Optional.ofNullable(user.getCoupons())
                .map(couponsStr -> Arrays.stream(couponsStr.split(";"))
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .toList())
                .orElse(List.of());

        if (couponCodes.isEmpty()) {
            return Page.empty(pageable);
        }

        List<Coupon> coupons = repository.findByCodeIn(couponCodes);

        List<GetAllCouponResponse> responses = Optional.ofNullable(coupons)
                .orElse(List.of())
                .stream()
                .map(mapper::toGetAllCouponResponse)
                .toList();

        return new PageImpl<>(responses, pageable, responses.size());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<AdminCouponResponse> getAllAdminCoupons(Pageable pageable) {
        Page<Coupon> couponPage = repository.findAll(pageable);
        return couponPage.map(mapper::toAdminCouponResponse);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<AdminCouponResponse> getCouponsFilter(CouponFilterAdminRequest request, Pageable pageable) {
        Specification<Coupon> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(request.getCode())) {
                predicates.add(cb.like(cb.lower(root.get("code")), "%" + request.getCode().toLowerCase() + "%"));
            }

            if (request.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), request.getStatus()));
            }

            if (request.getMinDiscount() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("discount"), request.getMinDiscount()));
            }

            if (request.getCreatedAt() != null) {
                LocalDateTime start = request.getCreatedAt().atStartOfDay();
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), start));
            }

            if (request.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("minPrice"), request.getMinPrice()));
            }

            if (request.getPriceCondition() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("priceCondition"), request.getPriceCondition()));
            }

            if (request.getType() != null) {
                predicates.add(cb.equal(root.get("type"), request.getType()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Coupon> couponPage = repository.findAll(spec, pageable);
        return couponPage.map(mapper::toAdminCouponResponse);
    }

    public List<GetAllCouponResponse> getTop5Coupons() {
        var coupons = repository.findTop5ByOrderByExpirationDateDesc();
        return mapper.toGetAllCouponResponseList(coupons);
    }
}
