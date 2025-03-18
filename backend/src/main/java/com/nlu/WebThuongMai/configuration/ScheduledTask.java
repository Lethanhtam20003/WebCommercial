package com.nlu.WebThuongMai.configuration;

import com.nlu.WebThuongMai.service.InvalidatedTokenService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

@Component
@EnableScheduling
public class ScheduledTask {
    InvalidatedTokenService invalidatedTokenService;

    @Scheduled(cron = "${schedules.Reset-invalidated_token}")
    public void resetInvalidatedToken() {
        invalidatedTokenService.resetInvalidatedToken();
    }
}
