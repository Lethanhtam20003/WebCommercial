package com.nlu.WebThuongMai.exception;

import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.text.ParseException;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .code(9999)
                .message(e.getMessage())
                .build());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<String>> handlingValidation(MethodArgumentNotValidException e) {
        String enumKey = e.getBindingResult().getFieldError().getDefaultMessage();
        ErrorCode code = ErrorCode.INVALID_KEY;
        try {
            code = ErrorCode.valueOf(enumKey);
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("INVALID ERROR");
        }
        return ResponseEntity.badRequest().body(Objects.requireNonNull(
                ApiResponse.<String>builder()
                        .code(code.getCode())
                        .message(code.getMessage())
                        .build())
        );
    }

    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse> handlingAppException(AppException e) {
        return ResponseEntity
                .status(e.errorCode.getHttpStatusCode())
                .body(ApiResponse.builder()
                        .code(e.errorCode.getCode())
                        .message(e.errorCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<ApiResponse> handlingAppException(AccessDeniedException e) {
        ErrorCode code = ErrorCode.UNAUTHORIZED;
        return ResponseEntity
                .status(code.getHttpStatusCode())
                .body(ApiResponse.builder()
                        .code(code.getCode())
                        .message(code.getMessage())
                        .build());
    }
    @ExceptionHandler(value = ParseException.class)
    public ResponseEntity<ApiResponse> handlingParseException(ParseException e) {
        ErrorCode code = ErrorCode.TOKEN_INVALID;
        return ResponseEntity
                .status(code.getHttpStatusCode())
                .body(ApiResponse.builder()
                        .code(code.getCode())
                        .message(code.getMessage())
                        .build());
    }
}
