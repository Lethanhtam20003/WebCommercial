import {Component} from '@angular/core';
import {LoginComponent} from '../../components/login.components';

@Component({
  selector: 'login',
  imports: [LoginComponent],
  template: `
    <login-component/>
  `,
  styleUrl: './login.page.scss'
})
export class LoginPage {
}
