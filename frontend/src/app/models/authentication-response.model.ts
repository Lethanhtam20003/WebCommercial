/**
 * Interface đại diện cho response khi xác thực thành công
 */
export interface AuthenticationResponse {
    /**
     * Token JWT được trả về sau khi xác thực thành công
     * Dùng để xác thực các request tiếp theo
     */
    access_token: string;
}