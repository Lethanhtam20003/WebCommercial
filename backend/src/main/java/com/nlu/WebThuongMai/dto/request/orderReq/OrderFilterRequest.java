package com.nlu.WebThuongMai.dto.request.orderReq;

import com.nlu.WebThuongMai.enums.OrderStatus;
import lombok.Data;

@Data
public class OrderFilterRequest {
    private Long userId;
    private OrderStatus status;
    int page=0;
    int size=10;
}
