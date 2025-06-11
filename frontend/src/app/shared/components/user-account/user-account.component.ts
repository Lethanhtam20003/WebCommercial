import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../../core/service/state/user-state.service';

@Component({
  selector: 'user-account',
  standalone: false,
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent implements OnInit{
  constructor(private userState: UserStateService) {}

  ngOnInit() {
    this.userState.fetchUserInfo();
  }

}
