package com.nlu.WebThuongMai.validator.promotion;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;


@Documented
@Constraint(validatedBy = DateRangeValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidDateRange {
    String message() default "DATE_VALID_ERROR";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
