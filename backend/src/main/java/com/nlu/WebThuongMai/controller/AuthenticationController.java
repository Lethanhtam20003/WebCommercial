package com.nlu.WebThuongMai.controller;

import com.nimbusds.jose.JOSEException;
import com.nlu.WebThuongMai.dto.request.authenticationReq.*;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.authenticationResp.AuthenticationResponse;
import com.nlu.WebThuongMai.dto.response.authenticationResp.IntrospectResponse;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.service.AuthenticationService;
import com.nlu.WebThuongMai.service.FacebookService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@Slf4j
@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    OAuth2AuthorizedClientService oAuth2AuthorizedClientService;
    FacebookService facebookService;

    @PostMapping
    ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.login(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/facebook")
    public ApiResponse<AuthenticationResponse> loginWithFacebook(@RequestBody FacebookRequest request) {
        User user = facebookService.verify(request.getAccessToken());
        var result = authenticationService.loginFacebook(user);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();


    }
}
