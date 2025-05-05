package com.nlu.WebThuongMai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * DTO đại diện cho thông tin người dùng từ Facebook
 * Được sử dụng để map dữ liệu trả về từ Facebook API
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserFacebook {
    /**
     * ID của người dùng Facebook
     */
    long id;

    /**
     * Tên đầy đủ của người dùng
     */
    String name;

    /**
     * Địa chỉ email của người dùng
     */
    String email;

    /**
     * Thông tin ảnh đại diện của người dùng
     */
    Picture picture;

    /**
     * Class đại diện cho thông tin ảnh đại diện
     * Được sử dụng để map với cấu trúc JSON của Facebook API
     */
    public static class Picture {

        /**
         * Dữ liệu chi tiết của ảnh
         */
        @JsonProperty("data")
        private Data data;

        // Getter và Setter cho trường picture
        public Data getData() {
            return data;
        }

        public void setData(Data data) {
            this.data = data;
        }

        /**
         * Class chứa thông tin URL của ảnh đại diện
         */
        public static class Data {

            /**
             * URL của ảnh đại diện
             */
            private String url;

            // Getter và Setter cho trường "url"
            public String getUrl() {
                return url;
            }

            public void setUrl(String url) {
                this.url = url;
            }
        }
    }
}
