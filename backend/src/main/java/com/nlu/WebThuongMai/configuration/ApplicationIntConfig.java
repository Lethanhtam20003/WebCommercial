package com.nlu.WebThuongMai.configuration;

import com.nlu.WebThuongMai.enums.Role;
import com.nlu.WebThuongMai.model.User;
import com.nlu.WebThuongMai.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Configuration
public class ApplicationIntConfig {
    PasswordEncoder passwordEncoder;

    @Bean
    public ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                Role role = Role.ADMIN;
                userRepository.save(User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .role(role)
                        .build());
                log.warn("admin user was created with default password: admin, please change it!");
            }
        };
    }
}
