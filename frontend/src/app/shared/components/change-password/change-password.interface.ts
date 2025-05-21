import { FormControl } from "@angular/forms";

export interface ChangePasswordFormFields {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  retypePassword: FormControl<string>;
}
