export interface CategoriesAdminFilterRequest {
  /**
   * Tên danh mục cần tìm (có thể là tìm gần đúng)
   */
  name?: string;

  /**
   * Mô tả danh mục cần tìm (có thể là tìm gần đúng)
   */
  description?: string;

  /**
   * Trang hiện tại (bắt đầu từ 0)
   */
  page: number;

  /**
   * Kích thước trang
   */
  size: number;
}
