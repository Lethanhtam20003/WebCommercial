package com.nlu.WebThuongMai.enums;

public enum OrderStatus {
    PENDING,    // Đơn hàng mới tạo, đang chờ xác nhận
    CONFIRMED,  // Đã xác nhận, chưa giao thành công
    SHIPPED,    // Đã xác nhận & đang vận chuyển
    DELIVERED,  // Đã giao thành công
    CANCELLED   // Đã hủy
}
