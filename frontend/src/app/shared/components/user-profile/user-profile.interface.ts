import { FormControl } from "@angular/forms";

export interface UserProfileFormFields {
  username: FormControl<string>;
  email: FormControl<string>;
  fullName: FormControl<string>;
  address: FormControl<string>;
  phoneNum: FormControl<string>;
  profileImage: FormControl<File | null>;
  birthday: FormControl<string>;
  gender: FormControl<string>;
}
