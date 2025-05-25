package com.nlu.WebThuongMai.service.OAuth2Service;

import com.nlu.WebThuongMai.enums.AuthProvider;
import com.nlu.WebThuongMai.enums.Role;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

import java.util.Map;
@Slf4j
@RequiredArgsConstructor

@Component
public class CustomOidcUserService implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final UserRepository userRepository;
    private final OidcUserService delegate = new OidcUserService();
    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("Load user from Google OIDC request");

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OidcUser oidcUser = delegate.loadUser(userRequest);
        Map<String, Object> attributes = oidcUser.getAttributes();

        String id = (String) attributes.get("sub"); // Google uses "sub" not "id"
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String avatar = (String) attributes.get("picture");
        AuthProvider authProvider = AuthProvider.GOOGLE;



        if (id == null) {
            throw new RuntimeException("Google provider_id is missing (sub)");
        }

        User user = userRepository.findUserByAuthProviderId(id);
        if (user == null) {
            // Kiểm tra xem người dùng đã tồn tại trong hệ thống chưa
            if(userRepository.existsByEmail(email)){
                ErrorCode errorCode = ErrorCode.USER_EXISTED;
                throw new OAuth2AuthenticationException(
                        new OAuth2Error(errorCode.getCode()+"", errorCode.getMessage(), null)
                );
            }
//          tao user moi
            userRepository.save(User.builder()
                    .username(name)
                    .email(email)
                    .authProvider(authProvider)
                    .authProviderId(id)
                    .role(Role.USER)
                    .avatar(avatar)
                    .build());
        }

        return oidcUser;
    }
}
