package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.promotion.PromotionRequest;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionResponse;
import com.nlu.WebThuongMai.mapper.PromotionMapper;
import com.nlu.WebThuongMai.repository.PromotionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class PromotionService {
    PromotionRepository repo;
    PromotionMapper mapper;

    @PreAuthorize("hasAuthority('ADMIN')")
    public List<PromotionResponse> getListPromotion() {
        return mapper.promotionToPromotionResp(repo.findAll());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public PromotionResponse createPromotion(PromotionRequest request) {
        log.info("Create promotion: {}", request);
        return mapper.promotionToPromotionResp(repo.save(mapper.promotionRequestToPromotion(request)));
    }
}
