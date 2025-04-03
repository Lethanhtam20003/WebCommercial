package com.nlu.WebThuongMai.repository;

import com.nlu.WebThuongMai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.authProviderId = :authProviderId")
    User findUserByAuthProviderId(String authProviderId);

}
