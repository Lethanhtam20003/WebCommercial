package com.nlu.WebThuongMai.validator.birthday;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

/**
 * class chinh sử lý validation
 */
public class BirthdayValidator implements ConstraintValidator<BirthdayConstraint, LocalDate> {
    int min;


    /**
     * hàm sử lý data có đúng hay ko
     *
     * @param constraintAnnotation
     */
    @Override
    public void initialize(BirthdayConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);

        this.min = constraintAnnotation.min();
    }

    /**
     * @param localDate
     * @param constraintValidatorContext
     * @return
     */
    @Override
    public boolean isValid(LocalDate localDate, ConstraintValidatorContext constraintValidatorContext) {
        if (Objects.isNull(localDate)) {
            return false;
        }
        long year = ChronoUnit.YEARS.between(localDate, LocalDate.now());
        return year >= this.min;
    }
}
