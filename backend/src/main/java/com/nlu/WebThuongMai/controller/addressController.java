package com.nlu.WebThuongMai.controller;

import com.nlu.WebThuongMai.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RestController
@RequestMapping("/v1/address")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class addressController {
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/provinces")
    public ResponseEntity<?> getProvinces() {
        String url = "https://provinces.open-api.vn/api/?depth=1";
        Object  result = restTemplate.getForObject(url, Object .class);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/districts/{provinceCode}")
    public ResponseEntity<?> getDistricts(@PathVariable int provinceCode) {
        String url = "https://provinces.open-api.vn/api/p/" + provinceCode + "?depth=2";
        Object  result = restTemplate.getForObject(url, Object .class);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/wards/{districtCode}")
    public ResponseEntity<?> getWards(@PathVariable int districtCode) {
        String url = "https://provinces.open-api.vn/api/d/" + districtCode + "?depth=2";
        Object  result = restTemplate.getForObject(url, Object.class);
        return ResponseEntity.ok(result);
    }
}
