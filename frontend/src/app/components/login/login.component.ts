import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { LabelConstants } from '../../constant/label.constants';
import { ErrorMessageConstants } from '../../constant/error-message.constants';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import {RouteLink} from '../../constant/route-link';
import {Router, RouterLink} from '@angular/router';
import {selectorName} from '../../constant/selectorName';
import { URL_API } from '../../constant/url-api.constants';

@Component({
	selector: selectorName.loginComponent,
	standalone: true,
	imports: [
		FormsModule,
		PasswordModule,
		FloatLabel,
		InputText,
		ButtonModule,
		NgClass,
		RouterLink,
	],
	template: `
    <div
      class="h-screen flex items-start justify-center pt-10 bg-white max-w-full"
    >
      <form class="bg-white border border-gray-200 drop-shadow-2xl p-10">
        <div class=" flex justify-center font-bold pb-10 text-[30px]">
          {{ Label.logIn }}
        </div>
        <div class="card flex justify-center flex-col w-100">
          <div class="flex flex-col justify-center pb-5">
            <p-floatlabel variant="on">
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
              >{{ Label.username }}</label
              >
            </p-floatlabel>
            @if (username == null || username == '') {
              <small class="block mt-1 text-sm text-red-500 pl-1"
              >{{ ErrorMessage.pleaseEnterUsername }}
              </small>
            } @else if (username.length < 3) {
              <small class="block mt-1 text-sm text-red-500 pl-1"
              >{{ ErrorMessage.usernameHasAtLeast3Characters }}
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
              >{{ Label.password }}</label
              >
            </p-floatlabel>
            @if (password == null || password == '') {
              <small class="block mt-1 text-sm text-red-500 pl-3"
              >{{ ErrorMessage.pleaseEnterPassword }}
              </small>
            } @else if (password.length < 8 || password.length > 30) {
              <small class="block mt-1 text-sm text-red-500 pl-3"
              >{{
                  ErrorMessage.passwordHasAtLeast8CharactersAndSmallerThan30
                }}
              </small>
            }
          </div>
          <div class="card flex gap-4 pt-4">
            <p-button
              label="{{ Label.logIn }}"
              [style]="{
								'background-color': '#141d22',
								'border-color': '#141d22',
								'border-radius': '0px',
							}"
            />
            <p-button
              routerLink="/{{ RouteLink.registerRoute }}"
              label="{{ Label.register }}"
              [style]="{
								'background-color': '#141d22',
								'border-color': '#141d22',
								'border-radius': '0px',
							}"
            />
          </div>
          <div class="card flex flex-col gap-2 pt-2">
            <p class="text-center text-sm">{{ Label.loginWithOther }}</p>
            <div
              class="card flex flex-row gap-2 w-full justify-center items-center"
            >
              <p-button (onClick)="loginWithFacebook()"
                severity="info"
                [rounded]="true"
                icon="pi pi-facebook"
              />
              <p-button
                severity="success"
                [rounded]="true"
                icon="pi pi-google"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  `, 
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {}
	/*
	 * @description: value for username and password in input
	 * */
	username: string = '';
	password: string = '';

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


  loginWithFacebook() {
    const popup = window.open(
      URL_API.facebookLogin,
      '_blank',
      'width=500,height=600'
    );
  
    const messageListener = (event: MessageEvent) => {
      alert(event.origin);
      if (event.origin !== URL_API.originUrl) return;
  
      const token = event.data.token;
      if (token) {
        localStorage.setItem('access_token', token);
      }
      this.router.navigate(['/']);
    };
  
    window.addEventListener('message', messageListener);
  }

}
