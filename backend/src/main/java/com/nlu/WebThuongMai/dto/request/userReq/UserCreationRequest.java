package com.nlu.WebThuongMai.dto.request.userReq;

import com.nlu.WebThuongMai.validator.BirthdayConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class UserCreationRequest {
    /**
     * trong spring-boot-starter-validation
     *
     * @NotBlank Ý nghĩa:
     * - Không được null.
     * - Không được là chuỗi rỗng ("").
     * - Không được chứa chỉ khoảng trắng (" ").
     * @NotEmpty Ý nghĩa:
     * - Không được null.
     * - Không được là chuỗi rỗng ("").
     * @Size(min = 8, max = 32, message = "password must be at least 8 characters and maximum number of characters is 30 ")
     * Ý nghĩa:
     * min = 8: Mật khẩu phải có ít nhất 8 ký tự.
     * max = 32: Mật khẩu tối đa 32 ký tự.
     * message = "...": Thông báo lỗi khi nhập sai dữ liệu.
     */
    @NotBlank(message = "USERNAME_INVALID")
    @Size(min = 3, message = "USERNAME_SIZE_INVALID")
    String username;
    @Size(min = 8, max = 32, message = "PASSWORD_SIZE_INVALID")
    @NotBlank
    String password;

    String fullName;
    @BirthdayConstraint(min = 18, message = "INVALID_BIRTHDAY")
    LocalDate birthday;
    String avatar;
    String gender;

    @NotBlank
    String email;
    String phone;
    String address;

    String status;
}
