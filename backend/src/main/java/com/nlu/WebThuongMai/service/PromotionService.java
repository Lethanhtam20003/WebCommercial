package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.promotion.PromotionRequest;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionResponse;
import com.nlu.WebThuongMai.mapper.PromotionMapper;
import com.nlu.WebThuongMai.model.Promotion;
import com.nlu.WebThuongMai.repository.PromotionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Service
public class PromotionService {
    PromotionRepository repo;
    PromotionMapper mapper;

    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<PromotionResponse> getListPromotion(Pageable pageable) {
        Page<Promotion> promotions = repo.findAll(pageable);
        return promotions.map(mapper::promotionToPromotionResp);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public PromotionResponse createPromotion(PromotionRequest request) {
        log.info("Create promotion: {}", request);
        return mapper.promotionToPromotionResp(repo.save(mapper.promotionRequestToPromotion(request)));
    }

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public List<PromotionResponse> getActivePromotionList() {
        LocalDate today = LocalDate.now();

        List<Promotion> activePromotions = repo
                .findByStartDateLessThanEqualAndEndDateGreaterThanEqual(today, today);

        return mapper.promotionToPromotionResp(activePromotions);

    }
}
