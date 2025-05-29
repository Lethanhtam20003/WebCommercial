package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.response.couponResp.GetAllCouponResponse;
import com.nlu.WebThuongMai.model.Coupon;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CouponMapper {

    GetAllCouponResponse toGetAllCouponResponse(Coupon coupon);

    List<GetAllCouponResponse> toGetAllCouponResponseList(List<Coupon> coupons);
}
