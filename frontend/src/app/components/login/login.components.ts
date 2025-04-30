import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ErrorMessageConstants } from '../../constant/error-message.constants';
import { LabelConstants } from '../../constant/label.constants';
import { RouteLink } from '../../constant/route-link';

@Component({
	selector: 'login-component',
	standalone: true,
	imports: [
		FormsModule,
		PasswordModule,
		FloatLabel,
		ButtonModule,
		RouterLink,
		InputTextModule,
		ReactiveFormsModule,
    CommonModule,
	],
	templateUrl: './login.components.html',
	styleUrls: ['./login.components.scss'],
})
export class LoginComponent implements OnInit {
	/**
	 * @description: id for username and password input
	 */
	readonly usernameInputId: string = 'username';
	readonly passwordInputId: string = 'password';
	readonly registerButtonId: string = 'registerButton';
	readonly loginButtonId: string = 'logInButton';
	readonly passwordInputField: string = 'passwordInputId';

	/**
	 * @description: initial data when the component is initial
	 */
	loginFormGroup!: FormGroup;
	ngOnInit(): void {
		this.loginFormGroup = new FormGroup({
			username: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(3),
			]),
			password: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30),
			]),
		});
	}

	protected readonly Label = LabelConstants;
	protected readonly ErrorMessage = ErrorMessageConstants;
	protected readonly RouteLink = RouteLink;
}
