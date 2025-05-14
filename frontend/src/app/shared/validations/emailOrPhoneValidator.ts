import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailOrPhoneValidator(control: AbstractControl): ValidationErrors | null {
    const { value } = control;
    if (!value) {
        return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;

    const isEmail = emailRegex.test(value);
    const isPhone = phoneRegex.test(value);

    return isEmail || isPhone ? null : { emailOrPhone: true };
}

