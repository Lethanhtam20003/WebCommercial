import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../../features/product/product-list/product-list.component';
import { ProductList2Component } from '../../features/product/product-list2/product-list2.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterModule, ProductListComponent, ProductList2Component],
  template: ` 
    <p>
      <app-product-list></app-product-list>
      <app-product-list2></app-product-list2>
    </p>
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
