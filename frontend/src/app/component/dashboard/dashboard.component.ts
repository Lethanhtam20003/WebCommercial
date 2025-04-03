import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterModule],
  template: ` 
    <p>
      dashboard works!
    </p>
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
