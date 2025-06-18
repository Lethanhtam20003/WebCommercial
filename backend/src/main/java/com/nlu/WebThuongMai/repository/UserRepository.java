package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.enums.Role;
import com.nlu.WebThuongMai.model.Coupon;
import com.nlu.WebThuongMai.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.authProviderId = :authProviderId")
    User findUserByAuthProviderId(String authProviderId);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phoneNumber);

    Page<User> findAllByRole(Role role, Pageable pageable);
}
