package com.nlu.WebThuongMai.model;

import com.nlu.WebThuongMai.enums.Role;
import com.nlu.WebThuongMai.enums.Gender;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
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
    @Column(nullable = false)
    String password;

    String firstName;
    String lastName;
    String avatar;
    LocalDate birthday;
    @Enumerated(EnumType.STRING)
    Gender gender;

    @Column(nullable = false, unique = true) // Đảm bảo email không trùng
    String email;
    @Column(unique = true) // Số điện thoại không trùng
    String phone;
    String address;
    @Enumerated(EnumType.STRING)
    Role role;
    String status;

    @ManyToMany(fetch = FetchType.EAGER) //  Quan hệ 1 chiều: User có nhiều Coupon
    @JoinTable(
            name = "user_coupon",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "coupon_id")
    )
    Set<Coupon> coupons;

    @CreationTimestamp
    LocalDateTime created_at;
    LocalDateTime updated_at;



}
