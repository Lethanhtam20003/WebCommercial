package com.nlu.WebThuongMai.exception;

import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class AppException extends RuntimeException {
    ErrorCode errorCode;
}
