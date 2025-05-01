import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../../features/product-list/product-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterModule, ProductListComponent],
  template: ` 
    <p>
      dashboard works!
      <app-product-list></app-product-list>
      ok
    </p>
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
