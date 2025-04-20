package com.nlu.WebThuongMai.configuration;

import com.nlu.WebThuongMai.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

/**
 * Cấu hình bảo mật cho ứng dụng
 * Bao gồm cấu hình CORS, JWT, OAuth2, và các endpoint công khai
 */
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
            "/v3/api-docs"
    };

    @Autowired
    private CustomJwtDecoder customJwtDecoder;
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    @Autowired
    private Oauth2SuccessHandler oAuth2SuccessHandler;
    @Autowired
    private JwtAuthenticationFilter jwtFilter;

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
//
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                // Cấu hình xử lý khi người dùng không có quyền truy cập
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint()) // Trả về lỗi 403 nếu không có quyền
                )
//              cấu hình login
                .oauth2Login(oauth2Login -> oauth2Login
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                                .userService(customOAuth2UserService)
                        )
                        .successHandler(oAuth2SuccessHandler)
                )
//              dùng để xác thực token JWT được gửi từ client
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.decoder(customJwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
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
