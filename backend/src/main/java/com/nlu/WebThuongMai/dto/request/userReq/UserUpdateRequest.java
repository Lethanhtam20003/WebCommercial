package com.nlu.WebThuongMai.dto.request.userReq;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

/**
 * DTO đại diện cho request cập nhật thông tin người dùng
 * Chứa các thông tin có thể được cập nhật của người dùng
 */
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    /**
     * Mật khẩu mới của người dùng
     */
    String password;

    /**
     * Tên của người dùng
     */
    String firstName;

    /**
     * Họ của người dùng
     */
    String lastName;

    /**
     * Ngày sinh của người dùng
     */
    LocalDate birthday;

    /**
     * URL ảnh đại diện của người dùng
     */
    String avatar;

    /**
     * Giới tính của người dùng
     */
    String gender;

    /**
     * Email của người dùng
     */
    String email;

    /**
     * Số điện thoại của người dùng
     */
    String phone;

    /**
     * Địa chỉ của người dùng
     */
    String address;

    /**
     * Trạng thái tài khoản của người dùng
     */
    String status;
}
