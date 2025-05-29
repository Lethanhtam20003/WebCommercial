package com.nlu.WebThuongMai.dto.request.userReq;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateInfoRequest {
    /**
     * Họ tên của người dùng
     */
    String fullName;

    /**
     * Ngày sinh của người dùng
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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
}
