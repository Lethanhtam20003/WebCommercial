package com.nlu.WebThuongMai.controller;

import com.nimbusds.jose.JOSEException;
import com.nlu.WebThuongMai.dto.request.authenticationReq.*;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.authenticationResp.AuthenticationResponse;
import com.nlu.WebThuongMai.dto.response.authenticationResp.IntrospectResponse;
import com.nlu.WebThuongMai.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@Slf4j
@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    OAuth2AuthorizedClientService oAuth2AuthorizedClientService;

    /**
     * Đăng ký tài khoản mới
     *
     * @param request Thông tin người dùng mới
     * @return Không có dữ liệu trả về
     */
    @PostMapping("/register")
    ApiResponse<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        authenticationService.register(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .build();
    }

    /**
     * Đăng nhập vào hệ thống
     *
     * @param request Thông tin đăng nhập (username/password)
     * @return Token xác thực và thông tin người dùng
     */
    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.login(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }


    /**
     * Đăng xuất khỏi hệ thống
     *
     * @param request Thông tin token cần hủy
     * @return Không có dữ liệu trả về
     * @throws ParseException Nếu có lỗi khi xử lý token
     * @throws JOSEException  Nếu có lỗi liên quan đến JWT
     */
    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .build();
    }

    /**
     * Kiểm tra thông tin token
     *
     * @param request Token cần kiểm tra
     * @return Thông tin về tính hợp lệ của token
     * @throws ParseException Nếu có lỗi khi xử lý token
     * @throws JOSEException  Nếu có lỗi liên quan đến JWT
     */
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    /**
     * Làm mới token xác thực
     *
     * @param request Refresh token
     * @return Token xác thực mới
     * @throws ParseException Nếu có lỗi khi xử lý token
     * @throws JOSEException  Nếu có lỗi liên quan đến JWT
     */
    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @GetMapping("/checkRoleAdmin")
    ApiResponse<Boolean> checkRoleAdmin(){
        return ApiResponse.<Boolean>builder()
                .result(authenticationService.checkRoleAdmin())
                .build();
    }


}
