package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.userReq.UserCreationRequest;
import com.nlu.WebThuongMai.dto.request.userReq.UserUpdateRequest;
import com.nlu.WebThuongMai.dto.response.userResp.UserResponse;
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

/**
 * Service xử lý các chức năng liên quan đến người dùng.
 * Bao gồm các thao tác CRUD (Create, Read, Update, Delete) cho người dùng,
 * cũng như các chức năng quản lý thông tin cá nhân.
 * Class này sử dụng Spring Security để phân quyền truy cập các method.
 */
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

    /**
     * Tạo mới một người dùng trong hệ thống.
     * Method này chỉ có thể được gọi bởi ADMIN.
     *
     * @param request Đối tượng chứa thông tin người dùng cần tạo
     * @return UserResponse chứa thông tin của người dùng đã được tạo
     * @throws AppException nếu username đã tồn tại trong hệ thống
     */
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse createUser(UserCreationRequest request) {
        User u = userMapper.toUser(request);

        u.setRole(Role.USER);
        u.setPassword(passwordEncoder.encode(request.getPassword()));

        try {
            u = userRepository.save(u);
        } catch (DataIntegrityViolationException e) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(u);
    }

    /**
     * Lấy danh sách tất cả người dùng trong hệ thống.
     * Method này chỉ có thể được gọi bởi ADMIN.
     *
     * @return List<UserResponse> Danh sách thông tin của tất cả người dùng
     */
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        return userMapper.toUserResponseList(userRepository.findAll());
    }

    /**
     * Lấy thông tin của một người dùng theo ID.
     * Method này chỉ có thể được gọi bởi ADMIN.
     *
     * @param userId ID của người dùng cần tìm
     * @return UserResponse chứa thông tin của người dùng
     * @throws AppException nếu không tìm thấy người dùng với ID tương ứng
     */
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getUserById(long userId) {
        return userMapper.toUserResponse(userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    /**
     * Cập nhật thông tin của một người dùng.
     * Method này có thể được gọi bởi ADMIN hoặc chính người dùng đó.
     *
     * @param userId ID của người dùng cần cập nhật
     * @param request Đối tượng chứa thông tin cần cập nhật
     * @return UserResponse chứa thông tin đã được cập nhật
     * @throws RuntimeException nếu không tìm thấy người dùng với ID tương ứng
     */
    @PreAuthorize("hasRole('ADMIN') and hasRole('USER')")
    public UserResponse updateUser(long userId, UserUpdateRequest request) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.toUser(u, request);
        return userMapper.toUserResponse(userRepository.save(u));
    }

    /**
     * Xóa một người dùng khỏi hệ thống.
     * Method này chỉ có thể được gọi bởi ADMIN.
     *
     * @param userId ID của người dùng cần xóa
     */
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(long userId) {
        userRepository.deleteById(userId);
    }

    /**
     * Lấy thông tin của người dùng hiện tại đang đăng nhập.
     * Method này chỉ có thể được gọi bởi USER đã đăng nhập.
     *
     * @return UserResponse chứa thông tin của người dùng hiện tại
     * @throws AppException nếu không tìm thấy thông tin người dùng trong hệ thống
     */
    @PreAuthorize("hasRole('USER')")
    public UserResponse getMyInf() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

}
