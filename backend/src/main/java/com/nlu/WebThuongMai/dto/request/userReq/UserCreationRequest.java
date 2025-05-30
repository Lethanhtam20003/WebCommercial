package com.nlu.WebThuongMai.dto.request.userReq;

import com.nlu.WebThuongMai.validator.birthday.BirthdayConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

/**
 * DTO đại diện cho request tạo mới người dùng
 * Chứa các thông tin cần thiết và các ràng buộc validation
 */
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

    /**
     * Mật khẩu của người dùng
     *
     * @NotBlank: Không được null hoặc rỗng
     * @Size: Độ dài từ 8-32 ký tự
     */
    @Size(min = 8, max = 32, message = "PASSWORD_SIZE_INVALID")
    @NotBlank
    String password;

    /**
     * Họ tên đầy đủ của người dùng
     */
    String fullName;

    /**
     * Ngày sinh của người dùng
     *
     * @BirthdayConstraint: Kiểm tra tuổi tối thiểu là 18
     */
    @BirthdayConstraint(min = 18, message = "INVALID_BIRTHDAY")
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
     *
     * @NotBlank: Không được null hoặc rỗng
     */
    @NotBlank
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
