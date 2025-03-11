package com.nlu.WebThuongMai.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {BirthdayValidator.class}
)
/**
 * class tự cấu hình annotation custom cho các validation
 */
public @interface BirthdayConstraint {
    String message() default "Invalid Birthday";

    int min();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
