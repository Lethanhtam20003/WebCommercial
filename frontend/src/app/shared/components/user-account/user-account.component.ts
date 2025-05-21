import { Component } from '@angular/core';
import { SideBarUserProfile } from "../side-bar-user-account/side-bar-user-profile";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'user-account',
  imports: [SideBarUserProfile, RouterOutlet],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {

}
