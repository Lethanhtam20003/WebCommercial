package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.userReq.UserChangePasswordRequest;
import com.nlu.WebThuongMai.dto.request.userReq.UserCreationRequest;
import com.nlu.WebThuongMai.dto.request.userReq.UserUpdateInfoRequest;
import com.nlu.WebThuongMai.dto.request.userReq.UserUpdateRequest;
import com.nlu.WebThuongMai.dto.response.userResp.UserChangePasswordResponse;
import com.nlu.WebThuongMai.dto.response.userResp.UserInforResponse;
import com.nlu.WebThuongMai.dto.response.userResp.UserResponse;
import com.nlu.WebThuongMai.enums.Role;
import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import com.nlu.WebThuongMai.mapper.UserChangePasswordMapper;
import com.nlu.WebThuongMai.mapper.UserInfoMapper;
import com.nlu.WebThuongMai.mapper.UserMapper;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
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
    UserInfoMapper userInfoMapper;
    PasswordEncoder passwordEncoder;
    UserChangePasswordMapper userChangePasswordMapper;

    /**
     * Tạo mới một người dùng trong hệ thống.
     * Method này chỉ có thể được gọi bởi ADMIN.
     *
     * @param request Đối tượng chứa thông tin người dùng cần tạo
     * @return UserResponse chứa thông tin của người dùng đã được tạo
     * @throws AppException nếu username đã tồn tại trong hệ thống
     */
    @PreAuthorize("hasAuthority('ADMIN')")
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
    @PreAuthorize("hasAuthority('ADMIN')")
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
    @PreAuthorize("hasAuthority('ADMIN')")
    public UserResponse getUserById(long userId) {
        return userMapper.toUserResponse(userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    /**
     * Cập nhật thông tin của một người dùng.
     * Method này có thể được gọi bởi ADMIN hoặc chính người dùng đó.
     *
     * @param userId  ID của người dùng cần cập nhật
     * @param request Đối tượng chứa thông tin cần cập nhật
     * @return UserResponse chứa thông tin đã được cập nhật
     * @throws RuntimeException nếu không tìm thấy người dùng với ID tương ứng
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    public UserResponse updateUser(long userId, UserUpdateRequest request) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userMapper.toUser(u, request);
        return userMapper.toUserResponse(userRepository.save(u));
    }

    /**
     * Xóa một người dùng khỏi hệ thống.
     * Method này chỉ có thể được gọi bởi ADMIN.
     *
     * @param userId ID của người dùng cần xóa
     */
    @PreAuthorize("hasAuthority('ADMIN')")
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
    public UserInforResponse getMyInf() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userInfoMapper.toUserResponse(user);
    }

    public User findUserById(@NotNull long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    /**
     * Cập nhật thông tin cá nhân của người dùng hiện tại.
     *
     * @param userId  ID của người dùng đang đăng nhập (xác thực từ token)
     * @param request Thông tin mới cần cập nhật
     * @return UserInforResponse chứa thông tin người dùng sau khi cập nhật
     * @throws AppException nếu người dùng không tồn tại
     */
    @PreAuthorize("hasAuthority('USER')")
    public UserInforResponse updateMyUserInfo(long userId, UserUpdateInfoRequest request) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        userInfoMapper.toUserUpdateInfo(u, request);
        return userInfoMapper.toUserResponse(userRepository.save(u));
    }

    /**
     * Đổi mật khẩu người dùng sau khi xác thực mật khẩu cũ.
     *
     * @param userId  ID của người dùng đang đăng nhập (xác thực từ token)
     * @param request Dữ liệu gồm mật khẩu cũ và mật khẩu mới
     * @return UserChangePasswordResponse chứa thông tin sau khi đổi mật khẩu
     * @throws AppException nếu người dùng không tồn tại hoặc mật khẩu cũ không khớp
     */
    @PreAuthorize("hasAuthority('USER')")
    public UserChangePasswordResponse updateUserPassword(long userId, UserChangePasswordRequest request) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!passwordEncoder.matches(request.getOldPassword(), u.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }

        String hashedPassword = passwordEncoder.encode(request.getNewPassword());
        u.setPassword(hashedPassword);

        userChangePasswordMapper.toUserChangePassword(u, request);

        return userChangePasswordMapper.toUserChangePasswordResponse(userRepository.save(u));
    }

    /**
     * Tìm người dùng trong hệ thống dựa trên tên đăng nhập (username).
     *
     * @param username tên đăng nhập của người dùng (không được null hoặc rỗng)
     * @return thực thể {@link User} tương ứng với username
     * @throws AppException nếu không tìm thấy người dùng, ném ra {@link ErrorCode#USER_NOT_FOUND}
     */
    public User findUserByUsername(@NotNull String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
}
