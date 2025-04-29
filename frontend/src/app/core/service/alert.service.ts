import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private swal = Swal.mixin({
    confirmButtonText: 'OK',
    cancelButtonText: 'Hủy',
    buttonsStyling: true,
    customClass: {
      confirmButton: 'btn btn-primary mx-2',
      cancelButton: 'btn btn-secondary mx-2'
    }
  });

  /**
   * Thông báo thành công
   * @param message Nội dung thông báo
   * @param title Tiêu đề (mặc định: "Thành công")
   */
  success(message: string, title = 'Thành công'): void {
    this.swal.fire({
      icon: 'success',
      title,
      text: message
    });
  }

  /**
   * Thông báo lỗi
   * @param message Nội dung lỗi
   * @param title Tiêu đề (mặc định: "Lỗi")
   */
  error(message: string, title = 'Lỗi'): void {
    this.swal.fire({
      icon: 'error',
      title,
      text: message
    });
  }

  /**
   * Cảnh báo
   * @param message Nội dung cảnh báo
   * @param title Tiêu đề (mặc định: "Cảnh báo")
   */
  warning(message: string, title = 'Cảnh báo'): void {
    this.swal.fire({
      icon: 'warning',
      title,
      text: message
    });
  }

  /**
   * Nhắc xác nhận hành động
   * @param message Nội dung yêu cầu xác nhận
   * @param title Tiêu đề (mặc định: "Xác nhận")
   * @returns Promise<boolean> true nếu người dùng chọn OK
   */
  confirm(message: string, title = 'Xác nhận'): Promise<boolean> {
    return this.swal
      .fire({
        icon: 'question',
        title,
        text: message,
        showCancelButton: true
      })
      .then(result => result.isConfirmed);
  }

  /**
   * Nhập dữ liệu đơn giản
   * @param inputLabel Nhãn cho ô nhập
   * @param title Tiêu đề (mặc định: "Nhập thông tin")
   * @returns Promise<string | null>
   */
  input(inputLabel: string, title = 'Nhập thông tin'): Promise<string | null> {
    return this.swal
      .fire({
        title,
        input: 'text',
        inputLabel,
        showCancelButton: true
      })
      .then(result => (result.isConfirmed ? result.value : null));
  }
  constructor() { }
}
