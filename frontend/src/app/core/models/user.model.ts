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

    /**
     * Đường dẫn URL ảnh đại diện của người dùng.
     * Có thể là ảnh từ hệ thống hoặc từ bên thứ ba (ví dụ: Google avatar).
     * Nếu không có, có thể là `null`.
     */
    avatar: string;
}
