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
      <div class="h-screen w-full flex items-start justify-center pt-10 bg-white">
        <form class="bg-white border border-gray-200 drop-shadow-2xl p-10 rounded-md">
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
              @if (username == null || username == '') {
                <small class="block mt-1 text-sm text-red-500 pl-1"
                >{{ errorMessage.pleaseEnterUsername }}
                </small>
              } @else if (username.length < 3) {
                <small class="block mt-1 text-sm text-red-500 pl-1"
                >{{ errorMessage.usernameHasAtLeast3Characters }}
                </small>
              }
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
              @if (password == null || password == '') {
                <small class="block mt-1 text-sm text-red-500 pl-3"
                >{{ errorMessage.pleaseEnterPassword }}
                </small>
              } @else if (password.length < 8 || password.length > 30) {
                <small class="block mt-1 text-sm text-red-500 pl-3"
                >{{ errorMessage.passwordHasAtLeast8CharactersAndSmallerThan30 }}
                </small>
              }
            </div>
            <div class="card flex gap-4 pt-4">
              <p-button
                label="{{ labels.logIn }}"
                [style]="{
								'background-color': '#141d22',
								'border-color': '#141d22',
								'border-radius': '0px',
							}"
              />
              <p-button
                label="{{ labels.register }}"
                [style]="{
								'background-color': 'black',
								'border-color': 'black',
								'border-radius': '0px',
							}"
              />
            </div>
            <div class="card flex flex-col gap-2 pt-2">
              <p class="text-center text-sm">{{labels.loginWithOther}}</p>
              <div class="card flex flex-row gap-2 w-full justify-center items-center">
                <p-button
                  severity="info"
                  [rounded]="true"
                  icon="pi pi-facebook"/>
                <p-button
                  severity="success"
                  [rounded]="true"
                  icon="pi pi-google"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    `,
  styles: `
    ::ng-deep .p-button:hover {
      background-color: #FF4500 !important;
      border-color: #FF4500 !important;
    }
  `
})
export class LoginComponent {
  /*
  * @description: value for username and password in input
  * */
	username: string='';
	password: string='';

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
}
