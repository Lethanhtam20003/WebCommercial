/**
 * Interface đại diện cho cấu trúc response chuẩn của API
 * @template T Kiểu dữ liệu của kết quả trả về
 */
export interface ApiResponse<T> {
    /**
     * Mã trạng thái HTTP của response
     * Mặc định là 200 (Success)
     */
    code?: number;

    /**
     * Thông báo kèm theo response
     * Mặc định là "Success"
     */
    message?: string;

    /**
     * Dữ liệu kết quả trả về
     */
    result: T;
}