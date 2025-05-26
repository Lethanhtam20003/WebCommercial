import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarUserAccount } from '../side-bar-user-account/side-bar-user-account';

@Component({
  selector: 'user-account',
  imports: [SideBarUserAccount, RouterOutlet],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {

}
