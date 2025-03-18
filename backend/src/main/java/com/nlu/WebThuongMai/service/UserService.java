package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.UserCreationRequest;
import com.nlu.WebThuongMai.dto.request.UserUpdateRequest;
import com.nlu.WebThuongMai.dto.response.UserResponse;
import com.nlu.WebThuongMai.enums.Role;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.UserMapper;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    /*
    @RequiredArgsConstructor
    Lombok sẽ tự động tạo constructor với tất cả các final fields
    ** example
        private final UserRepository userRepository;

        // Constructor Injection
        @Autowired
        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }
     */
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse createUser(UserCreationRequest request) {
        User u = userMapper.toUser(request);

        u.setRole(Role.USER);
        u.setPassword(passwordEncoder.encode(request.getPassword()));

        try {
            u = userRepository.save(u);
        }catch (DataIntegrityViolationException e){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(u);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        return userMapper.toUserResponseList(userRepository.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getUserById(String id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.toUser(u, request);
        return userMapper.toUserResponse(userRepository.save(u));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public UserResponse getMyInf() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

}
