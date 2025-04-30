import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LabelConstants } from '../../constant/label.constants';
import { ErrorMessageConstants } from '../../constant/error-message.constants';
import { RouteLink } from '../../constant/route-link';

@Component({
	selector: 'register-component',
	standalone: true,
	imports: [
    CommonModule,
    ReactiveFormsModule,
    Button,
    FloatLabel,
    InputText,
    Password,
    RouterLink,
	],
	templateUrl: './register.components.html',
	styleUrls: ['./register.components.scss', '../../../styles.scss'],
})
export class RegisterComponent implements OnInit {
	/*
	 * @description: id for username and password input
	 * */
	readonly usernameInputId: string = 'username';
	readonly passwordInputId: string = 'password';
	readonly retypePasswordInputId: string = 'retypePassword';
	readonly emailInputId: string = 'email';

	/**
	 * @description: initial data when the component is initial
	 */
	registerForm!: FormGroup;
	ngOnInit(): void {
		this.registerForm = new FormGroup({
			username: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(3),
			]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30),
			]),
			retypePassword: new FormControl('', [Validators.required]),
		});
	}

	get passwordMismatch(): boolean {
		return (
			this.registerForm.get('password')?.value !==
			this.registerForm.get('retypePassword')?.value
		);
	}

	protected readonly Label = LabelConstants;
	protected readonly ErrorMessage = ErrorMessageConstants;
	protected readonly RouteLink = RouteLink;
}
