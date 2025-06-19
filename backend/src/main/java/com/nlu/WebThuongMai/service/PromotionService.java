package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.promotion.FilterPromotionRequest;
import com.nlu.WebThuongMai.dto.request.promotion.PromotionRequest;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionAdminResponse;
import com.nlu.WebThuongMai.dto.response.promotion.PromotionResponse;
import com.nlu.WebThuongMai.mapper.PromotionMapper;
import com.nlu.WebThuongMai.model.Promotion;
import com.nlu.WebThuongMai.repository.PromotionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

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

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public List<PromotionResponse> getActivePromotionList() {
        LocalDate today = LocalDate.now();

        List<Promotion> activePromotions = repo
                .findByStartDateLessThanEqualAndEndDateGreaterThanEqual(today, today);

        return mapper.promotionToPromotionResp(activePromotions);

    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<PromotionAdminResponse> filterPromotionsByAdmin(
            FilterPromotionRequest request,
            Pageable pageable
    ) {
        Specification<Promotion> spec = Specification.where(null);

        // Lọc theo tên
        String name = request.getName();
        if (name != null && !name.trim().isEmpty()) {
            String finalName = name.trim().toLowerCase(); // biến final để dùng trong lambda
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("name")), "%" + finalName + "%")
            );
        }

        // Lọc theo ngày bắt đầu
        if (request.getStartDateFrom() != null) {
            LocalDate startDate = request.getStartDateFrom();
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("startDate"), startDate)
            );
        }

        // Lọc theo ngày kết thúc
        if (request.getEndDateTo() != null) {
            LocalDateTime endDate = request.getEndDateTo().atTime(23, 59, 59);
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("endDate"), endDate)
            );
        }

        // Lọc theo giá trị giảm giá tối thiểu
        if (request.getMinDiscount() != null && !request.getMinDiscount().trim().isEmpty()) {
            try {
                BigDecimal minDiscount = new BigDecimal(request.getMinDiscount().trim());
                spec = spec.and((root, query, cb) ->
                        cb.greaterThanOrEqualTo(root.get("discountPercent"), minDiscount)
                );
            } catch (NumberFormatException ignored) {
                // Không filter nếu không parse được
            }
        }

        Page<Promotion> pageResult = repo.findAll(spec, pageable);
        return pageResult.map(mapper::promotionToPromotionAdminResp);
    }
}
