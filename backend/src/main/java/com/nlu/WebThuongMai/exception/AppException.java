package com.nlu.WebThuongMai.exception;

import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppException extends RuntimeException {
    ErrorCode errorCode;
}
