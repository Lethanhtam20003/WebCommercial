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

    UNCATEGORIZED_EXCEPTION(9998, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR);

    int code;
    String message;
    HttpStatusCode httpStatusCode;

}
