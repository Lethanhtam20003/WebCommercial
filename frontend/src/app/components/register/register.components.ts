import { Component, ElementRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LabelConstants } from '../../constant/label.constants';
import { ErrorMessageConstants } from '../../constant/error-message.constants';
import { RouteLink } from '../../constant/route-link';

@Component({
	selector: 'register-component',
	standalone: true,
	imports: [
		Button,
		FloatLabel,
		FormsModule,
		InputText,
		Password,
		NgClass,
		RouterLink,
	],
	templateUrl: './register.components.html',
	styleUrls: ['./register.components.scss', '../../../styles.scss'],
})
export class RegisterComponent {
	/*
	 * @description: value for username and password in input
	 * */
	username: string = '';
	password: string = '';
	retypePassword: string = '';
	email: string = '';

	/*
	 * @description: id for username and password input
	 * */
	readonly usernameInputId: string = 'username';
	readonly passwordInputId: string = 'password';
	readonly retypePasswordInputId: string = 'retypePassword';
	readonly emailInputId: string = 'email';

	/*
	 * @description: state for username and password input
	 * */
	usernameIsFocused: boolean = false;
	passwordIsFocused: boolean = false;
	retypePasswordIsFocused: boolean = false;
	emailIsFocused: boolean = false;

	/*
	 * @description: set focus for username input
	 * */
	@ViewChild('usernameInput') usernameInput!: ElementRef;
	@ViewChild('emailInput') emailInput!: ElementRef;
	ngAfterViewInit() {
		if (this.usernameInput) {
			this.usernameInput.nativeElement.addEventListener('focus', () => {
				this.setFocus('username', true);
			});
			this.usernameInput.nativeElement.addEventListener('blur', () => {
				this.setFocus('username', false);
			});
		}
		if (this.emailInput) {
			this.emailInput.nativeElement.addEventListener('focus', () => {
				this.setFocus('email', true);
			});
			this.emailInput.nativeElement.addEventListener('blur', () => {
				this.setFocus('email', false);
			});
		}
	}

	/*
	 * @description: event handler set focus for input
	 * */
	setFocus(field: string, isFocused: boolean) {
		if (field === 'username') {
			this.usernameIsFocused = isFocused;
		} else if (field === 'email') {
			this.emailIsFocused = isFocused;
		} else if (field === 'password') {
			this.passwordIsFocused = isFocused;
		} else if (field === 'retypePassword') {
			this.retypePasswordIsFocused = isFocused;
		}
	}

	/*
	 * @description: validate email format
	 * */
	isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	protected readonly Label = LabelConstants;
	protected readonly ErrorMessage = ErrorMessageConstants;
	protected readonly RouteLink = RouteLink;
}
