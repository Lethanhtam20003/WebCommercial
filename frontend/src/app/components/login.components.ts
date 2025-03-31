import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Label } from '../constant/label';
import { ErrorMessage } from '../constant/error.message';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
	selector: 'login-component',
	standalone: true,
	imports: [
		FormsModule,
		PasswordModule,
		FloatLabel,
		InputText,
		ButtonModule,
		NgClass,
	],
	template: `
		<div class="h-screen w-full flex items-start justify-center pt-10 bg-[#FF7F50]">
			<form class="bg-white border border-gray-200 drop-shadow-2xl p-10 rounded-xl">
				<div class=" flex justify-center font-bold pb-10 text-[40px]">
					{{ labels.logIn }}
				</div>
				<div class="card flex justify-center flex-col w-100">
					<div class="flex flex-col justify-center pb-5">
						<p-floatlabel variant="on" class="w-full">
							<input
                #usernameInput
								pInputText
								pSize="large"
								class="w-full"
								id="{{ usernameInputId }}"
								[(ngModel)]="username"
								autocomplete="on"
								name="{{ usernameInputId }}"
							/>
							<label
								[ngClass]="{ '!text-black': usernameIsFocused }"
								for="{{ usernameInputId }}"
								>{{ labels.username }}</label
							>
						</p-floatlabel>
						<small class="block mt-1 text-sm text-gray-500 pl-3"
							>{{ errorMessage.pleaseEnterUsername }}
						</small>
					</div>
					<div class="flex flex-col justify-center">
						<p-floatlabel variant="on" class="w-full">
							<p-password
								[(ngModel)]="password"
								class="w-full"
								size="large"
								[toggleMask]="true"
								[feedback]="false"
								inputId="on_label"
								name="{{ passwordInputId }}"
								(onFocus)="setFocus('password', true)"
								(onBlur)="setFocus('password', false)"
							/>
							<label
								[ngClass]="{ 'text-black': passwordIsFocused }"
								for="{{ passwordInputId }}"
								>{{ labels.password }}</label
							>
						</p-floatlabel>
						<small class="block mt-1 text-sm text-gray-500 pl-3"
							>{{ errorMessage.pleaseEnterPassword }}
						</small>
					</div>
					<div class="card flex justify-center gap-4 pt-4">
						<p-button
							label="{{ labels.logIn }}"
							icon="pi pi-check"
							[loading]="loading"
							(onClick)="load()"
							[style]="{
								'background-color': '#E9762B',
								'border-color': '#E9762B',
							}"
						/>
					</div>
				</div>
			</form>
		</div>
	`,
})
export class LoginComponent {
  /*
  * @description: value for username and password in input
  * */
	username: string='';
	password: string='';

  /*
  * @description: loading state for button
  * */
	loading: boolean = false;

  /*
  * @description: id for username and password input
  * */
	readonly usernameInputId: string = 'username';
	readonly passwordInputId: string = 'password';

  /*
  * @description: state for username and password input
  * */
	usernameIsFocused: boolean = false;
	passwordIsFocused: boolean = false;

  /*
  * @description: labels for input and error message for input
  * */
	labels: Label = new Label();
	errorMessage: ErrorMessage = new ErrorMessage();

  /*
  * @description: constructor for component
  * */
	load() {
		this.loading = true;

		setTimeout(() => {
			this.loading = false;
		}, 2000);
	}

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
		console.log(
			`usernameIsFocused: ${this.usernameIsFocused}, passwordIsFocused: ${this.passwordIsFocused}`
		);
	}
}
