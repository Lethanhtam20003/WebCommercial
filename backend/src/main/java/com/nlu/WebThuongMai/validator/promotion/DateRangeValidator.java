package com.nlu.WebThuongMai.validator.promotion;

import com.nlu.WebThuongMai.dto.request.promotion.PromotionRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DateRangeValidator implements ConstraintValidator<ValidDateRange, PromotionRequest> {
    @Override
    public boolean isValid(PromotionRequest value, ConstraintValidatorContext context) {
        if (value.getStartDate() == null || value.getEndDate() == null) return true; // đã check @NotNull ở DTO
        return value.getStartDate().isBefore(value.getEndDate());
    }
}
