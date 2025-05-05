/**
 * Interface đại diện cho response khi kiểm tra trạng thái xác thực
 */
export interface IntrospectResponse {
    /**
     * Trạng thái xác thực của người dùng
     * true: Đã xác thực
     * false: Chưa xác thực
     */
    isValid: boolean;
}