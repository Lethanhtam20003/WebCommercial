import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabelConstants } from '../../../core/constants/label.constants';
import { ErrorMessageConstants } from '../../../core/constants/error-message.constants';
import { NgClass } from '@angular/common';
import { RouteLink } from '../../../core/constants/route-link';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'register-component',
	standalone: true,
	imports: [
		FormsModule,
		NgClass,
		RouterLink,
	],
	template: `
		<div
			class="vh-100 d-flex align-items-start justify-content-center pt-4 bg-white w-100"
		>
			<form class="bg-white border border-light shadow p-4">
				<div class="d-flex justify-content-center fw-bold pb-4 fs-3">
					{{ Label.register }}
				</div>
				<div class="card d-flex justify-content-center flex-column w-100">
					<div class="d-flex flex-column justify-content-center pb-3">
						<div class="form-floating">
							<input
								#usernameInput
								type="text"
								class="form-control"
								id="{{ usernameInputId }}"
								[(ngModel)]="username"
								autocomplete="on"
								name="{{ usernameInputId }}"
								placeholder="{{ Label.username }}"
							/>
							<label
								[ngClass]="{ 'text-dark': usernameIsFocused }"
								for="{{ usernameInputId }}"
								>{{ Label.username }}</label
							>
						</div>
						@if (username == null || username == '') {
							<small class="d-block mt-1 fs-6 text-danger ps-1"
								>{{ ErrorMessage.pleaseEnterUsername }}
							</small>
						} @else if (username.length < 3) {
							<small class="d-block mt-1 fs-6 text-danger ps-1"
								>{{ ErrorMessage.usernameHasAtLeast3Characters }}
							</small>
						}
					</div>
					<div class="d-flex flex-column justify-content-center pb-3">
						<div class="form-floating">
							<input
								#emailInput
								type="email"
								class="form-control"
								id="{{ emailInputId }}"
								[(ngModel)]="email"
								autocomplete="on"
								name="{{ emailInputId }}"
								placeholder="{{ Label.email }}"
							/>
							<label
								[ngClass]="{ 'text-dark': emailIsFocused }"
								for="{{ emailInputId }}"
								>{{ Label.email }}</label
							>
						</div>
						@if (email == null || email == '') {
							<small class="d-block mt-1 fs-6 text-danger ps-1"
								>{{ ErrorMessage.pleaseEnterEmail }}
							</small>
						} @else if (!isValidEmail(email)) {
							<small class="d-block mt-1 fs-6 text-danger ps-1">
								{{ ErrorMessage.emailIsNotValid }}
							</small>
						}
					</div>
					<div class="d-flex flex-column justify-content-center pb-3">
						<div class="form-floating">
							<input
								type="password"
								class="form-control"
								id="{{ passwordInputId }}"
								[(ngModel)]="password"
								name="{{ passwordInputId }}"
								placeholder="{{ Label.password }}"
								(focus)="setFocus('password', true)"
								(blur)="setFocus('password', false)"
							/>
							<label
								[ngClass]="{ 'text-dark': passwordIsFocused }"
								for="{{ passwordInputId }}"
							>
								{{ Label.password }}
							</label>
						</div>
						@if (password == null || password == '') {
							<small class="d-block mt-1 fs-6 text-danger ps-3"
								>{{ ErrorMessage.pleaseEnterPassword }}
							</small>
						} @else if (password.length < 8 || password.length > 30) {
							<small class="d-block mt-1 fs-6 text-danger ps-3"
								>{{
									ErrorMessage.passwordHasAtLeast8CharactersAndSmallerThan30
								}}
							</small>
						}
					</div>
					<div class="d-flex flex-column justify-content-center">
						<div class="form-floating">
							<input
								type="password"
								class="form-control"
								id="{{ retypePasswordInputId }}"
								[(ngModel)]="retypePassword"
								name="{{ retypePasswordInputId }}"
								placeholder="{{ Label.retypePassword }}"
								(focus)="setFocus('retypePassword', true)"
								(blur)="setFocus('retypePassword', false)"
							/>
							<label
								[ngClass]="{ 'text-dark': retypePasswordIsFocused }"
								for="{{ retypePasswordInputId }}"
								>{{ Label.retypePassword }}</label
							>
						</div>
						@if (password.trim() !== retypePassword.trim()) {
							<small class="d-block mt-1 fs-6 text-danger ps-3"
								>{{ ErrorMessage.retypePasswordMustBeSame }}
							</small>
						}
					</div>
					<div class="card d-flex gap-2 pt-3">
						<button
							type="button"
							class="btn btn-dark"
							style="border-radius: 0px;"
						>
							{{ Label.register }}
						</button>
					</div>
					<div class="card d-flex flex-row gap-1 pt-2">
						<p class="text-center fs-6">{{ Label.ifUHaveAnAccount }}</p>
						<a
							routerLink="/{{ RouteLink.loginRoute }}"
							class="text-center fs-6 text-primary"
						>
							{{ Label.returnToLogin }}
						</a>
					</div>
				</div>
			</form>
		</div>
	`,
	styleUrl: './register.component.scss',
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
