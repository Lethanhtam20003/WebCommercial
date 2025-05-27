export interface UserUpdateRequest {
	/**
	 * Mật khẩu mới của người dùng
	 */
	password?: string;

	/**
	 * Họ tên của người dùng
	 */
	fullName?: string;
	/**
	 * Ngày sinh của người dùng (định dạng ISO, ví dụ: "1990-01-01")
	 */
	birthday?: string;

	/**
	 * URL ảnh đại diện của người dùng
	 */
	avatar?: string;

	/**
	 * Giới tính của người dùng (ví dụ: "male", "female", "other")
	 */
	gender?: string;

	/**
	 * Email của người dùng
	 */
	email?: string;

	/**
	 * Số điện thoại của người dùng
	 */
	phone?: string;

	/**
	 * Địa chỉ của người dùng
	 */
	address?: string;

	/**
	 * Trạng thái tài khoản (ví dụ: "active", "inactive", "banned")
	 */
	status?: string;
}
