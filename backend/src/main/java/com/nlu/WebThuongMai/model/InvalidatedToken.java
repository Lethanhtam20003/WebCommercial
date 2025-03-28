package com.nlu.WebThuongMai.model;

import jakarta.persistence.*;
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
