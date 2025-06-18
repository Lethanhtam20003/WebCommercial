package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.enums.*;
import com.nlu.WebThuongMai.model.Order;
import com.nlu.WebThuongMai.model.Payment;
import com.nlu.WebThuongMai.repository.OrderRepository;
import com.nlu.WebThuongMai.repository.PaymentRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentService {
    OrderService orderService;
    PaymentRepository paymentRepository;
    OrderRepository orderRepository;


    @Transactional
    public void confirmPayment(Long orderId, Map paymentCapture, Map<String, Object> result) {
        Payment entity = Payment.builder()
                .paymentId(result.get("id").toString())
                .amount(new BigDecimal(((Map) paymentCapture.get("amount")).get("value").toString()))
                .status(PaymentStatus.valueOf(paymentCapture.get("status").toString()))
                .paymentMethod(PaymentMethod.PAYPAL)
                .currency(CurrencyType.USD)
                .build();

        // Gán đơn hàng
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        entity.setOrder(order);
        order.setPayment(entity);
        order.setStatus(OrderStatus.CONFIRMED); // hoặc PAID
        order.setPaymentStatus(PaymentOrderStatus.PAID);

        // Lưu Payment
        paymentRepository.save(entity);
    }
}
