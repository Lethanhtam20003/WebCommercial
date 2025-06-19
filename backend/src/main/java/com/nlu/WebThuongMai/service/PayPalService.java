package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.enums.exception.ErrorCode;
import com.nlu.WebThuongMai.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class PayPalService {
    @Value("${paypal.client-id}")
    private String clientId;

    @Value("${paypal.secret}")
    private String secret;

    @Value("${paypal.api-base-url}")
    private String baseUrl;


    private final RestTemplate restTemplate = new RestTemplate();

    public String createPayment(BigDecimal request) {
        BigDecimal amount = VNDtoUSD(request);
        // 1. Lấy access token từ PayPal
        String accessToken = getAccessToken();

        // 2. Tạo header cho request
        HttpHeaders headers = buildHeaders(accessToken);

        // 3. Tạo payload body gửi lên PayPal
        Map<String, Object> payload = buildPaymentPayload(amount);

        // 4. Gửi request tạo đơn hàng đến PayPal
        ResponseEntity<Map> response = sendCreateOrderRequest(headers, payload);

        // 5. Trích xuất URL redirect người dùng tới PayPal để thanh toán
        return extractApprovalUrl(response);
    }

    private BigDecimal VNDtoUSD(BigDecimal vndAmount) {
        BigDecimal exchangeRate = BigDecimal.valueOf(24000); // Tỷ giá cố định
        return vndAmount.divide(exchangeRate, 2, RoundingMode.HALF_UP);
    }


    /**
     * Tạo headers có chứa Access Token và Content-Type cho request gọi PayPal
     */
    private HttpHeaders buildHeaders(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken); // Gắn Bearer token vào Authorization
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    /**
     * Tạo payload (body) chứa thông tin đơn hàng cần thanh toán
     */
    private Map<String, Object> buildPaymentPayload(BigDecimal amount) {
        return Map.of(
                "intent", "CAPTURE",
                "purchase_units", List.of(Map.of(
                        "description", "Đơn hàng mua sản phẩm tại Web Thương Mại",
                        "amount", Map.of(
                                "currency_code", "USD",
                                "value", amount.toString()
                        )
                )),
                "application_context", Map.of(
                        "return_url", "http://localhost:4200/payment-success",
                        "cancel_url", "http://localhost:4200/payment-cancel",
                        "user_action", "PAY_NOW"
                )
        );
    }

    /**
     * Gửi HTTP POST đến endpoint tạo đơn hàng của PayPal
     */
    private ResponseEntity<Map> sendCreateOrderRequest(HttpHeaders headers, Map<String, Object> payload) {
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
        return restTemplate.postForEntity(
                baseUrl + "/v2/checkout/orders",
                request,
                Map.class
        );
    }

    /**
     * Từ response của PayPal, lấy link redirect có rel = "approve"
     */
    private String extractApprovalUrl(ResponseEntity<Map> response) {
        List<Map<String, String>> links = (List<Map<String, String>>) response.getBody().get("links");
        return links.stream()
                .filter(link -> "approve".equals(link.get("rel")))
                .findFirst()
                .map(link -> link.get("href"))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy link thanh toán"));
    }


    private String getAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(clientId, secret);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> request = new HttpEntity<>("grant_type=client_credentials", headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                baseUrl + "/v1/oauth2/token", request, Map.class
        );

        return response.getBody().get("access_token").toString();
    }

    public Map<String, Object> captureOrder(String token) {
        String accessToken = getAccessToken();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(
                baseUrl + "/v2/checkout/orders/" + token + "/capture",
                request,
                Map.class
        );
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new AppException(ErrorCode.PAYMENT_FAIL);
        }


        return response.getBody();
    }


}
