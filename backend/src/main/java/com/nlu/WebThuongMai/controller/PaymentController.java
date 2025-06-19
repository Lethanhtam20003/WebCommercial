package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.response.ApiResponse;
import com.nlu.WebThuongMai.service.PayPalService;
import com.nlu.WebThuongMai.service.PaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    private final PayPalService payPalService;
    private final PaymentService paymentService;


    @PostMapping("/create")
    public ApiResponse<String> create(@RequestParam BigDecimal amount) {
        String approvalLink = payPalService.createPayment(amount);
        return ApiResponse.<String>builder()
                .result(approvalLink)
                .build();
    }

    @PostMapping("/confirm")
    public ApiResponse<String> confirm(@RequestParam String token, @RequestParam Long orderId) {
        Map<String, Object> result = payPalService.captureOrder(token);

        Map purchaseUnit = ((List<Map>) result.get("purchase_units")).get(0);
        Map paymentCapture = ((List<Map>) ((Map) purchaseUnit.get("payments")).get("captures")).get(0);
        paymentService.confirmPayment(orderId, paymentCapture, result);
        return ApiResponse.<String>builder()
                .result("Thanh toán thành công")
                .build();
    }


}
