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
    PaymentRepository paymentRepository;
    OrderRepository orderRepository;
    PayPalService payPalService;


    @Transactional
    public void confirmPayment(Long orderId, Map<String, Object> paymentCapture, Map<String, Object> result) {
        try {
            Object amountObj = paymentCapture.get("amount");
            if (!(amountObj instanceof Map)) {
                throw new IllegalArgumentException("Cấu trúc 'amount' không hợp lệ");
            }

            Map<?, ?> amountMap = (Map<?, ?>) amountObj;
            BigDecimal amount = new BigDecimal(amountMap.get("value").toString());


            Payment entity = Payment.builder()
                    .paypalOrderId(result.get("id").toString())
                    .amount(payPalService.VNDtoUSD(amount))
                    .status(PaymentStatus.COMPLETED)
                    .paymentMethod(PaymentMethod.PAYPAL)
                    .currency(CurrencyType.USD)
                    .build();

            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

            entity.setOrder(order);
            entity.setUser(order.getUser());

            order.setPayment(entity);
            order.setPaymentStatus(PaymentOrderStatus.PAID);

            log.info("Order sau khi cập nhật: {}", order);
            orderRepository.save(order);
            paymentRepository.save(entity);

        } catch (Exception e) {
            log.error("Lỗi khi xác nhận thanh toán: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi xác nhận thanh toán: " + e.getMessage());
        }
    }

}
