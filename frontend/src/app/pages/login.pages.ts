import { Component } from '@angular/core';
import {LoginComponent} from '../components/login.components';

@Component({
  selector: 'login-page',
  imports: [
    LoginComponent
  ],
  template: `
    <login-component/>
  `,
})
export class LoginPages {
  value: string | undefined;
}
