import {Component} from '@angular/core';
import {LoginComponents} from '../../components/login.components';

@Component({
  selector: 'login',
  imports: [LoginComponents],
  template: `
    <login-component/>
  `,
  styleUrl: './login.page.scss'
})
export class LoginPage {
}
