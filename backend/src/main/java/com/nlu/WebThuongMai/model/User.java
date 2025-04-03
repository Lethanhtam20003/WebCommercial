package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.AuthProvider;
import com.nlu.WebThuongMai.enums.Gender;
import com.nlu.WebThuongMai.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    long id;
    @Column(nullable = false, unique = true) // ko null va khong trung lap
    String username;
    String password;

    @Column(nullable = false, unique = true) // Đảm bảo email không trùng
    String email;
    @Column(unique = true) // Số điện thoại không trùng
    String phone;
    @Enumerated
    @Column(name = "auth_provider")
    AuthProvider authProvider;
    @Column(name = "provider_id")
    long authProviderId;

    String fullName;
    @Column(length = 2000)
    String avatar;
    LocalDate birthday;
    String address;
    @Enumerated(EnumType.STRING)
    Gender gender;
    @Enumerated(EnumType.STRING)
    Role role;
    String status;
    String coupons;
    @CreationTimestamp
    LocalDateTime created_at;
    LocalDateTime updated_at;


}
