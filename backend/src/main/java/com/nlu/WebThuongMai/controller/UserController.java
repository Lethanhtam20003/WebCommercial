package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.request.userReq.UserCreationRequest;
import com.nlu.WebThuongMai.dto.request.userReq.UserUpdateRequest;
import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.dto.response.userResp.UserResponse;
import com.nlu.WebThuongMai.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@RestController
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
    ApiResponse<Boolean> deleteUser(@PathVariable long userId) {
        userService.deleteUser(userId);
        return ApiResponse.<Boolean>builder()
                .message("user has been deleted")
                .result(true)
                .build();
    }

    /**
     * Lấy thông tin của người dùng hiện tại
     *
     * @return Thông tin của người dùng đang đăng nhập
     */
    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInf() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInf())
                .build();
    }
}
