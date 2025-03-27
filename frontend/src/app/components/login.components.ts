import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Label} from '../constant/label';
import {ErrorMessage} from '../constant/error.message';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'login-component',
  imports: [FormsModule, PasswordModule, FloatLabel, InputText, ButtonModule],
  template: `
    <div class="min-h-screen flex items-start justify-center pt-10">
      <form class="bg-white border border-gray-200 shadow-lg p-10 rounded-xl">
        <div class=" flex justify-center font-bold pb-10 text-[40px]">{{ labels.logIn }}</div>
        <div class="card flex justify-center flex-col w-100">
          <div class="flex flex-col justify-center pb-5">
            <p-floatlabel variant="on" class="w-full">
              <input pInputText pSize="large" class="w-full" id="on_label" [(ngModel)]="username" autocomplete="on"/>
              <label for="on_label">{{ labels.username }}</label>
            </p-floatlabel>
            <small class="block mt-1 text-sm text-gray-500 pl-3">{{ errorMessage.pleaseEnterUsername }}
            </small>
          </div>
          <div class="flex flex-col justify-center">
            <p-floatlabel variant="on" class="w-full">
              <p-password [(ngModel)]="password" class="w-full" size="large" [toggleMask]="true" [feedback]="false" inputId="on_label"/>
              <label for="on_label">{{ labels.password }}</label>
            </p-floatlabel>
            <small class="block mt-1 text-sm text-gray-500 pl-3">{{ errorMessage.pleaseEnterPassword }}
            </small>
          </div>
          <div class="card flex justify-center gap-4 pt-4">
            <p-button label="Search" icon="pi pi-check" [loading]="loading" (onClick)="load()"
                      [style]="{'background-color': '#E9762B', 'border-color': '#E9762B'}"/>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  labels: Label=new Label();
  errorMessage: ErrorMessage=new ErrorMessage();
}
