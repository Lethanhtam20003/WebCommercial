import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { LabelConstants } from '../../constant/label.constants';
import { ErrorMessageConstants } from '../../constant/error-message.constants';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { RouteLink } from '../../constant/route-link';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'login-component',
	standalone: true,
	imports: [
		FormsModule,
		PasswordModule,
		FloatLabel,
		InputText,
		ButtonModule,
		RouterLink,
    NgClass
	],
	templateUrl: './login.components.html',
	styleUrls: ['./login.components.scss'],
})
export class LoginComponent {
	/*
	 * @description: value for username and password in input
	 * */
	username: string = '';
	password: string = '';

	/*
	 * @description: id for username and password input
	 * @var:
	 *  */
	readonly usernameInputId: string = 'username';
	readonly passwordInputId: string = 'password';
	readonly registerButtonId: string = 'registerButton';
	readonly loginButtonId: string = 'logInButton';
	readonly passwordInputField: string = 'passwordInputId';
	/*
	 * @description: state for username and password input
	 * */
	usernameIsFocused: boolean = false;
	passwordIsFocused: boolean = false;
	/*
	 * @description: set focus for username input
	 * */
	@ViewChild('usernameInput') usernameInput!: ElementRef;
	ngAfterViewInit() {
		if (this.usernameInput) {
			this.usernameInput.nativeElement.addEventListener('focus', () => {
				this.setFocus('username', true);
			});
			this.usernameInput.nativeElement.addEventListener('blur', () => {
				this.setFocus('username', false);
			});
		}
	}
	/*
	 * @description: event handler set focus for input
	 * */
	setFocus(field: string, isFocused: boolean) {
		if (field === 'username') {
			this.usernameIsFocused = isFocused;
		} else if (field === 'password') {
			this.passwordIsFocused = isFocused;
		}
	}

	protected readonly Label = LabelConstants;
	protected readonly ErrorMessage = ErrorMessageConstants;
	protected readonly RouteLink = RouteLink;
}
