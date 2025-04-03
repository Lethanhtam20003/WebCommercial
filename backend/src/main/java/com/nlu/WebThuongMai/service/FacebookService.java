package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.UserFacebook;
import com.nlu.WebThuongMai.dto.response.authenticationResp.FacebookResponse;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.UserMapper;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class FacebookService {
    UserRepository userRepository;
    WebClient webClient;
    private final UserMapper userMapper;

    public UserFacebook getUserInfo(String accessToken) {
        return webClient.get()
                .uri("/me?fields=id,name,email,picture&access_token=" + accessToken)
                .retrieve()
                .bodyToMono(UserFacebook.class) // Nhận dữ liệu JSON
                .block(); // Chờ lấy kết quả (synchronous)
    }

    public User registerAccountByFacebook(String accessToken) {
        UserFacebook userFacebook = webClient.get()
                .uri("/me?fields=id,name,email,picture&access_token=" + accessToken)
                .retrieve()
                .bodyToMono(UserFacebook.class).block();
        if (userFacebook == null) {
            throw new AppException(ErrorCode.ACCOUNT_FACEBOOK_NOT_EXISTED);
        }
        return userRepository.saveAndFlush(userMapper.userFacebookToUser(userFacebook));
    }

    public User verify(String accessToken) {
        if (accessToken == null || accessToken.isEmpty()) {
            throw new AppException(ErrorCode.INVALID_ACCESS_TOKEN);
        }
        // Kiểm tra ID người dùng từ Facebook API (bằng cách gọi API bất đồng bộ)
        FacebookResponse facebookResponse = webClient.get()
                .uri("/me?fields=id&access_token=" + accessToken)
                .retrieve()
                .bodyToMono(FacebookResponse.class)
                .block();  // Chặn và đợi kết quả trả về từ Mono

        if (facebookResponse == null || facebookResponse.getId() == null) {
            throw new AppException(ErrorCode.ACCOUNT_FACEBOOK_NOT_EXISTED);
        }
        // Tìm kiếm người dùng trong database theo ID của nhà cung cấp (Facebook)
        User existingUser = userRepository.findUserByAuthProviderId(facebookResponse.getId());

        // Nếu người dùng không tồn tại, đăng ký người dùng mới
        if (existingUser == null) {
            return registerAccountByFacebook(accessToken);
        } else {
            return existingUser;
        }

    }
}
