/**
 * Interface đại diện cho thông tin người dùng
 */
export interface User {
    /**
     * Tên đăng nhập của người dùng
     */
    username: string;

    /**
     * Vai trò/quyền hạn của người dùng trong hệ thống
     * Ví dụ: ADMIN, USER, etc.
     */
    role: string;
}