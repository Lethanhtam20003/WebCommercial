package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.userReq.*;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.userResp.UserChangePasswordResponse;
import com.nlu.WebThuongMai.dto.response.userResp.UserInforResponse;
import com.nlu.WebThuongMai.dto.response.userResp.UserResponse;
import com.nlu.WebThuongMai.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
@Validated
@RequestMapping("/v1/users")
public class UserController {
    UserService userService;

    /**
     * Tạo mới một người dùng
     *
     * @param request Thông tin người dùng cần tạo
     * @return Thông tin người dùng đã được tạo
     */
    @PostMapping()
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    /**
     * Lấy danh sách tất cả người dùng
     *
     * @return Danh sách thông tin của tất cả người dùng
     */
    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    /**
     * Lấy thông tin người dùng theo ID
     *
     * @param userId ID của người dùng cần tìm
     * @return Thông tin của người dùng tương ứng
     */
    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUserById(@PathVariable long userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserById(userId)).build();
    }

    /**
     * Cập nhật thông tin người dùng
     *
     * @param userId  ID của người dùng cần cập nhật
     * @param request Thông tin cần cập nhật
     * @return Thông tin người dùng sau khi cập nhật
     */
    @PutMapping("/{userId}")
        ApiResponse<UserResponse> updateUser(@PathVariable long userId, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(userId, request))
                .build();
    }

    /**
     * Xóa người dùng theo ID
     *
     * @param userId ID của người dùng cần xóa
     * @return Kết quả xóa người dùng
     */
    @DeleteMapping("/{userId}")
    ApiResponse<UserResponse> deleteUser(@PathVariable long userId) {
        return ApiResponse.<UserResponse>builder()
                .message("User has been banned")
                .result(userService.banUser(userId))
                .build();
    }

    /**
     * Lấy thông tin của người dùng hiện tại
     *
     * @return Thông tin của người dùng đang đăng nhập
     */
    @GetMapping("/myInfo")
    ApiResponse<UserInforResponse> getMyInf() {
        return ApiResponse.<UserInforResponse>builder()
                .result(userService.getMyInf())
                .build();
    }

    /**
     * Cập nhật thông tin cá nhân của người dùng.
     *
     * @param userId  ID của người dùng cần cập nhật (xác thực từ token)
     * @param request Dữ liệu thông tin mới của người dùng
     * @return ApiResponse chứa thông tin người dùng sau khi cập nhật
     */
    @PutMapping("/myInfo/{userId}")
    ApiResponse<UserInforResponse> updateMyInfoUser(@PathVariable long userId, @Valid @RequestBody UserUpdateInfoRequest request) {
        return ApiResponse.<UserInforResponse>builder()
                .result(userService.updateMyUserInfo(userId, request))
                .build();
    }

    /**
     * Thay đổi mật khẩu của người dùng sau khi xác thực mật khẩu cũ.
     *
     * @param userId  ID của người dùng cần đổi mật khẩu
     * @param request Dữ liệu gồm mật khẩu cũ và mật khẩu mới
     * @return ApiResponse chứa kết quả sau khi đổi mật khẩu thành công
     */
    @PutMapping("/myInfo/change-password/{userId}")
    ApiResponse<UserChangePasswordResponse> updateUserPassword(@PathVariable long userId, @Valid @RequestBody UserChangePasswordRequest request) {
        return ApiResponse.<UserChangePasswordResponse>builder()
                .result(userService.updateUserPassword(userId, request))
                .build();
    }

    @PostMapping("admin/filter")
    ApiResponse<Page<UserInforResponse>> getAllUsersFilterAdmin(
            @Valid
            @RequestBody() UserFilterAdminRequest request
    ) {
        return ApiResponse.<Page<UserInforResponse>>builder()
                .result(userService.getUsersFiltered(request, request.toPageable()))
                .build();
    }
}
