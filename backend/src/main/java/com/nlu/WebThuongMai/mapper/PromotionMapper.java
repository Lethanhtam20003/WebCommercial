package com.nlu.WebThuongMai.mapper;

import com.nlu.WebThuongMai.dto.request.promotion.PromotionRequest;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionAdminResponse;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionResponse;
import com.nlu.WebThuongMai.model.Promotion;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PromotionMapper {

    PromotionResponse promotionToPromotionResp(Promotion p);
    PromotionAdminResponse promotionToPromotionAdminResp(Promotion p);

    List<PromotionResponse> promotionToPromotionResp(List<Promotion> promotions);

    Promotion promotionRequestToPromotion(PromotionRequest request);
}
