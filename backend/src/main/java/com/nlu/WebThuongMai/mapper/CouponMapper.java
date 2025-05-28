package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.orderReq.CouponCreateRequest;
import com.nlu.WebThuongMai.dto.response.OrderResp.CouponResponse;
import com.nlu.WebThuongMai.model.Coupon;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CouponMapper {

    @Mapping(target = "id", ignore = true)
     Coupon toCoupon(CouponCreateRequest request);

     CouponResponse toCouponResponse(Coupon coupon);

    List<CouponResponse> toListCouponResponse(List<Coupon> all);

    Coupon couponResponseToCoupon(CouponResponse couponResponse);
}
