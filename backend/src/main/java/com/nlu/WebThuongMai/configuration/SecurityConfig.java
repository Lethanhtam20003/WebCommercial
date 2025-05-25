package com.nlu.WebThuongMai.configuration;

import com.nlu.WebThuongMai.configuration.OAuth2Handler.AuthenticationFailHandler;
import com.nlu.WebThuongMai.configuration.OAuth2Handler.Oauth2SuccessHandler;
import com.nlu.WebThuongMai.configuration.exceptionHandler.AuthenticationEntryPoint;
import com.nlu.WebThuongMai.configuration.exceptionHandler.CustomAccessDeniedHandler;
import com.nlu.WebThuongMai.service.OAuth2Service.CustomOAuth2UserService;
import com.nlu.WebThuongMai.service.OAuth2Service.CustomOidcUserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

/**
 * Cấu hình bảo mật cho ứng dụng
 * Bao gồm cấu hình CORS, JWT, OAuth2, và các endpoint công khai
 */
@AllArgsConstructor

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class SecurityConfig {
    /**
     * Danh sách các endpoint công khai không yêu cầu xác thực
     */
    private final String[] PUBLIC_ENDPOINTS = {
            "/v1/auth", "/v1/auth/*",
            "/v1/products", "/v1/products/*",
            "/v1/oauth2", "/v1/oauth2/*",
            "/login/facebook", "/oauth2/authorization/facebook",
            "/login/google", "/oauth2/authorization/google",};

    private final Oauth2SuccessHandler oAuth2SuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomOidcUserService customOidcUserService;
    private final AuthenticationFailHandler authenticationFailHandler;

    private final CustomJwtDecoder customJwtDecoder;
    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniceHandle;

    /**
     * Cấu hình chuỗi bộ lọc bảo mật
     * @param http Đối tượng HttpSecurity để cấu hình
     * @return SecurityFilterChain đã được cấu hình
     * @throws Exception Nếu có lỗi trong quá trình cấu hình
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //      Tắt CSRF nếu không cần thiết
                .csrf(AbstractHttpConfigurer::disable)
                //      cấu hình cho phép frontend truy cập các api
                .cors((cors -> cors.configurationSource(corsConfigurationSource())))
                //         Stateless session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // cấu hình security filter chain
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                        .anyRequest().authenticated())
                // Cấu hình xử lý khi người dùng không có quyền truy cập
               .exceptionHandling(exceptionHandling -> exceptionHandling
                       .authenticationEntryPoint(authenticationEntryPoint) // Trả về lỗi 401 nếu không có quyền
                       .accessDeniedHandler(accessDeniceHandle)// 403
               )

//              cấu hình login
                .oauth2Login(oauth2Login -> oauth2Login
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                                .oidcUserService(customOidcUserService)
                                .userService(customOAuth2UserService)
                        )
                        .successHandler(oAuth2SuccessHandler)
                        .failureHandler(authenticationFailHandler)
                )
                //              dùng để xác thực token JWT được gửi từ client
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.decoder(customJwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                        .authenticationEntryPoint(authenticationEntryPoint)

                );


        return http.build();
    }


    /**
     * Cấu hình chuyển đổi JWT Authentication
     * Chuyển đổi prefix từ SCOPE_ thành ROLE_ để sử dụng với @EnableMethodSecurity
     * Cho phép sử dụng @PreAuthorize("hasRole('ADMIN')") một cách thuận tiện
     *
     * @return JwtAuthenticationConverter đã được cấu hình
     */
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    /**
     * Cấu hình CORS (Cross-Origin Resource Sharing)
     * Cho phép frontend truy cập các API của backend
     *
     * @return CorsConfigurationSource đã được cấu hình
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // Cho phép Angular truy cập
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // Hỗ trợ gửi cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Cấu hình mã hóa mật khẩu
     * Sử dụng BCrypt với độ mạnh là 10
     *
     * @return PasswordEncoder để mã hóa mật khẩu
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

}
