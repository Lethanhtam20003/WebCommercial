/**
 * Interface đại diện cho thông tin người dùng
 */
export interface UserProfile {
	id: number;

	/**
	 * Tên đăng nhập của người dùng
	 */
	username: string;

	/**
	 * Họ tên của người dùng
	 */
	fullName: string | null;

	/**
	 * Đường dẫn URL ảnh đại diện của người dùng.
	 * Có thể là ảnh từ hệ thống hoặc từ bên thứ ba (ví dụ: Google avatar).
	 * Nếu không có, có thể là `null`.
	 */
	avatar: string | null;

	/**
	 * Ngày sinh của người dùng, dạng ISO string (YYYY-MM-DD)
	 */
	birthday: string | null;

	/**
	 * Giới tính của người dùng, ví dụ: 'MALE', 'FEMALE', hoặc null nếu chưa cập nhật
	 */
	gender: string | null;

	/**
	 * Email của người dùng
	 */
	email: string;

	/**
	 * Số điện thoại người dùng
	 */
	phone: string | null;

	/**
	 * Địa chỉ người dùng
	 */
	address: string | null;

	/**
	 * Vai trò/quyền hạn của người dùng trong hệ thống
	 */
	role: string;

  coupons: string;

	/**
	 * Phương thức xác thực của người dùng (ví dụ: 'LOCAL', 'GOOGLE', v.v.)
	 */
	authProvider: string;

	/**
	 * Thời điểm tạo người dùng, dạng ISO string
	 */
	created_at: string;

	/**
	 * Thời điểm cập nhật gần nhất, hoặc null nếu chưa có cập nhật
	 */
	updated_at: string | null;
}
