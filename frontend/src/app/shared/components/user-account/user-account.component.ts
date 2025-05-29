import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarUserAccount } from '../side-bar-user-account/side-bar-user-account';
import { UserStateService } from '../../../core/service/state/user-state.service';

@Component({
  selector: 'user-account',
  imports: [SideBarUserAccount, RouterOutlet],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent implements OnInit{
  constructor(private userState: UserStateService) {}

  ngOnInit() {
    this.userState.fetchUserInfo();
  }

}
