package com.nlu.WebThuongMai.validator.phone;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<PhoneConstraint,String> {

    public static final String PHONE_REGEX = "^(\\+84|84|0)[3|5|7|8|9][0-9]{8}$";

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return false;
        return value.matches(PHONE_REGEX);
    }
}
