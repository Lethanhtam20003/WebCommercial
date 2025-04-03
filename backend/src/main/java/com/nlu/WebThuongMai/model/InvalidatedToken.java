package com.nlu.WebThuongMai.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)

@Entity
@Table(name = "invalidated_token")
/**
 * bang chua ca token da logout
 */
public class InvalidatedToken {
    @Id
    String id;
    Date expiryTime;
}
