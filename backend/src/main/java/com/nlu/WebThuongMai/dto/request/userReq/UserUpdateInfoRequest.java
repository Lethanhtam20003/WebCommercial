package com.nlu.WebThuongMai.dto.request.userReq;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
    @Size(min = 3, max = 100, message = "Họ tên phải từ 3 đến 100 ký tự")
    String fullName;

    /**
     * Ngày sinh của người dùng
     */
    @Past(message = "Ngày sinh phải trong quá khứ")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate birthday;

    /**
     * URL ảnh đại diện của người dùng
     */
    @Size(max = 255, message = "URL ảnh đại diện quá dài")
    @Pattern(
            regexp = "^(http|https)://.*$",
            message = "Avatar phải là URL hợp lệ (bắt đầu bằng http hoặc https)"
    )
    String avatar;

    /**
     * Giới tính của người dùng
     */
    @Pattern(
            regexp = "MALE|FEMALE|OTHER",
            message = "Giới tính chỉ được là MALE, FEMALE hoặc OTHER"
    )
    String gender;

    /**
     * Email của người dùng
     */
    @Email(message = "Email không hợp lệ")
    String email;

    /**
     * Số điện thoại của người dùng
     */
    @Pattern(
            regexp = "^(\\+84|0)[1-9][0-9]{8,9}$",
            message = "Số điện thoại không hợp lệ"
    )
    String phone;

    /**
     * Địa chỉ của người dùng
     */
    @Size(max = 255, message = "Địa chỉ không được vượt quá 255 ký tự")
    String address;
}
