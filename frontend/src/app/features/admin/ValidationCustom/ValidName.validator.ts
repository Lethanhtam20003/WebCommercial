import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AdminProductCreateComponent } from "../components/product-manament/admin-product-create/admin-product-create.component"
import { catchError, map, Observable, of, switchMap, timer } from "rxjs";
import { AdminProductService } from "../service/admin-product.service";

export function ValidNameValidator(service: AdminProductService){
    console.log("check");
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const name = control.value;
    if (!name) {
      return of(null); // Nếu không có giá trị, không cần kiểm tra
    }   
    // Đợi 500ms sau khi gõ để hạn chế gọi API quá nhiều
    return timer(500).pipe(
      switchMap(() =>
        service.checkProductNameExited(name).pipe(
          map(exists => exists ? { nameTaken: true } : null),
          catchError(() => of(null))
        )
      )
    );
    };
}