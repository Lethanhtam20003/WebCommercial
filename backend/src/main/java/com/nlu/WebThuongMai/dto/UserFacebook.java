package com.nlu.WebThuongMai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserFacebook {
    long id;
    String name;
    String email;
    Picture picture;

    public static class Picture {

        @JsonProperty("data")
        private Data data;

        // Getter và Setter cho trường picture
        public Data getData() {
            return data;
        }

        public void setData(Data data) {
            this.data = data;
        }

        // Inner class Data để ánh xạ trường "data"
        public static class Data {

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
