package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.enums.AuthProvider;
import com.nlu.WebThuongMai.enums.Role;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

/**
 * Service tùy chỉnh xử lý xác thực người dùng qua OAuth2 (Facebook).
 * Mở rộng từ DefaultOAuth2UserService của Spring Security để xử lý việc đăng nhập
 * và tự động tạo tài khoản cho người dùng khi họ đăng nhập lần đầu qua Facebook.
 */
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    UserRepository userRepository;

    /**
     * Xử lý thông tin người dùng sau khi xác thực qua OAuth2.
     * Phương thức này được gọi sau khi người dùng đăng nhập thành công qua Facebook.
     * Nó sẽ tự động tạo tài khoản mới nếu người dùng chưa tồn tại trong hệ thống.
     *
     * @param userRequest Chứa thông tin request OAuth2 từ người dùng
     * @return OAuth2User đối tượng chứa thông tin người dùng từ Facebook
     * @throws OAuth2AuthenticationException nếu xác thực thất bại
     * @throws RuntimeException nếu thiếu provider_id trong response từ OAuth2
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Lấy thông tin người dùng từ Facebook
        String id = oAuth2User.getAttribute("id");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String avata = oAuth2User.getAttribute("avatar");
        if (id == null) {
            throw new RuntimeException("provider_id is missing from OAuth2 response");
        }
        long providerId = Long.parseLong(id);
        // Lưu hoặc cập nhật người dùng
        User user = userRepository.findUserByAuthProviderId(id);
        if (user == null) {
            userRepository.save(User.builder()
                    .username(name)
                    .email(email)
                    .authProvider(AuthProvider.FACEBOOK)
                    .authProviderId(providerId)
                    .role(Role.USER)
                    .avatar(avata)
                    .build());
        }
        log.warn(user.toString());
        return oAuth2User;
    }
}
