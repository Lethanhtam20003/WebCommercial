package com.nlu.WebThuongMai.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

/**
 * Entity đại diện cho các token đã bị vô hiệu hóa trong hệ thống
 * Được sử dụng để lưu trữ các token đã logout hoặc hết hạn
 * Giúp ngăn chặn việc sử dụng lại các token không còn hợp lệ
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "invalidated_token")
/**
 * bang chua ca token da logout
 */
public class InvalidatedToken {
    /**
     * ID của token bị vô hiệu hóa
     * Chính là giá trị của token đó
     */
    @Id
    String id;

    /**
     * Thời điểm token hết hạn
     * Dùng để xóa các token đã hết hạn khỏi database
     */
    Date expiryTime;
}
