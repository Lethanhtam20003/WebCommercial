import { Component } from '@angular/core';
import {DashboardComponent} from '../../components/dashboard.component';

@Component({
  selector: 'admin',
  imports: [
    DashboardComponent
  ],
  template: `
    <dashboard></dashboard>
  `,
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
}
