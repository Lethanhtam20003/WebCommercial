package com.nlu.WebThuongMai.enums.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@AllArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9998, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1000, "Invalid message key", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1001, "user existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002, "user not existed", HttpStatus.NOT_FOUND),
    USERNAME_SIZE_INVALID(1003, "username must be at least 3 characters", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1004, "user name must not be null,Must not be an empty string, Must not contain only whitespace", HttpStatus.BAD_REQUEST),
    PASSWORD_SIZE_INVALID(1005, "password must be at least 8 characters and maximum number of characters is 30", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1006, "unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "you do not have permission", HttpStatus.FORBIDDEN),
    INVALID_BIRTHDAY(1008, "invalid birthday", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1009, "user not found", HttpStatus.NOT_FOUND),
    TOKEN_INVALID(1010, "token invalid", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_FOUND(1011, "product not found", HttpStatus.NOT_FOUND),
    ACCOUNT_FACEBOOK_NOT_EXISTED(1012, "account facebook not existed", HttpStatus.NOT_FOUND),
    INVALID_ACCESS_TOKEN(1013, "invalid access token", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1014, "password invalid", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_CORRECT(1015, "password not correct", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1016, "email existed", HttpStatus.BAD_REQUEST),
    PHONE_EXISTED(1017, "phone existed", HttpStatus.BAD_REQUEST),
    INVALID_SIGNATURE(1018, "invalid signature", HttpStatus.BAD_REQUEST),
    TOKEN_EXPIRED(1019, "token expired", HttpStatus.BAD_REQUEST),
    PRODUCT_EXISTED(1020, "product existed", HttpStatus.BAD_REQUEST),
    SUPPLIER_EXISTED(1021, "supplier existed", HttpStatus.BAD_REQUEST),
    SUPPLIER_NOT_FOUND(1022, "supplier not found", HttpStatus.BAD_REQUEST),
    SUPPLIER_NAME_EXISTED(1023, "supplier name existed", HttpStatus.BAD_REQUEST),
    PURCHASE_ORDER_NOT_FOUND(1024, "purchase order not found", HttpStatus.BAD_REQUEST),
    QUALITY_PRODUCT_NOT_ENOUGH(1025, "quality product not enough", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_FOUND_IN_STOCK(1026, "product not found in stock", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(1027, "order not found", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_ENOUGH_IN_STOCK(1028, "product not enough in stock", HttpStatus.BAD_REQUEST),
    ORDER_ALREADY_CONFIRMED(1029, "order already confirmed", HttpStatus.BAD_REQUEST),
    ORDER_NOT_CONFIRMED(1030, "order not confirmed", HttpStatus.BAD_REQUEST),
    ORDER_ALREADY_SHIPPED(1031, "order already shipped", HttpStatus.BAD_REQUEST),
    ORDER_ALREADY_DELIVERED(1032, "order already delivered", HttpStatus.BAD_REQUEST),
    ORDER_ALREADY_CANCELLED(1033, "order already cancelled", HttpStatus.BAD_REQUEST),
    ORDER_CAN_NOT_CANCEL_BECAUSE_IT_WAS_CONFIRMED_OR_SHIPPED(1034, "order can not cancel because it was confirmed or shipped", HttpStatus.BAD_REQUEST),
    COUPON_NOT_FOUND(1035, "coupon not found", HttpStatus.BAD_REQUEST),
    COUPON_ALREADY_EXISTED(1036, "coupon already existed", HttpStatus.BAD_REQUEST),
    FIELD_CAN_NOT_BE_NULL(1037, "field can not be null", HttpStatus.BAD_REQUEST),
    FIELD_COUPONS_SIZE_INVALID_10_40(1038, "field size invalid be at least 10 characters  maximum number of characters is 40", HttpStatus.BAD_REQUEST),
    DISCOUNT_COUPONS_MUST_BE_POSITIVE(1039, "discount must be positive", HttpStatus.BAD_REQUEST),
    DESCRIPTION_COUPONS_SIZE_INVALID(1040, "description must be at least 5 characters maximum number of characters is 2555", HttpStatus.BAD_REQUEST),
    LIMIT_USERS_COUPONS_MUST_BE_POSITIVE(1041, "limit users must be positive", HttpStatus.BAD_REQUEST),
    EXPIRATION_DATE_COUPONS_MUST_BE_IN_FUTURE(1042, "expiration date must be in future", HttpStatus.BAD_REQUEST),
    PRICE_CONDITION_COUPONS_MUST_BE_POSITIVE(1043, "price condition must be positive", HttpStatus.BAD_REQUEST),
    MIN_PRICE_COUPONS_MUST_BE_POSITIVE(1044, "min price must be positive", HttpStatus.BAD_REQUEST),
    MIN_PRICE_COUPONS_MUST_BE_LESS_THAN_50000(1045, "min price must be less than 50000", HttpStatus.BAD_REQUEST),
    NAME_NOT_NULL(1046, "name not null", HttpStatus.BAD_REQUEST),
    DATE_VALID_ERROR(1048, "date valid error", HttpStatus.BAD_REQUEST),
    NOT_NULL(1047, "not null", HttpStatus.BAD_REQUEST),
    DISCOUNT_PERCENT_NOT_NULL(1049, "discount percent not null", HttpStatus.BAD_REQUEST),
    START_DATE_NOT_NULL(1050, "start date not null", HttpStatus.BAD_REQUEST),
    END_DATE_NOT_NULL(1051, "end date not null", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_FOUND(1052,"category not found",HttpStatus.NOT_FOUND),
    INVALID_QUANTITY(1053,"invalid quantity",HttpStatus.BAD_REQUEST),
    CANNOT_UPDATE_CANCELLED_ORDER(1054,"cannot update cancelled order",HttpStatus.BAD_REQUEST),
    INVALID_STATUS_TRANSITION(1055,"invalid status transition",HttpStatus.BAD_REQUEST),
    PROMOTION_NOT_FOUND(1056, "Promotion not found", HttpStatus.NOT_FOUND);

    int code;
    String message;
    HttpStatusCode httpStatusCode;

}
