import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { AdminProductListComponent } from './components/product-manament/admin-product-list/admin-product-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', 
        component: DashboardComponent,
        data: {
          showHeader: true,
          showFooter: false,
        }
      },
      {
        path: 'product-management',
        component: ProductManagementComponent,
        children: [
          {
            path: 'product-list',
            loadComponent: () => 
              import('./components/product-manament/admin-product-list/admin-product-list.component')
              .then(m => m.AdminProductListComponent),
          },
          {
            path: 'create-product',
            loadComponent: () => 
              import('./components/product-manament/admin-product-create/admin-product-create.component')
              .then(m => m.AdminProductCreateComponent),
          },
          {
            path: '',
            redirectTo: 'product-list',
            pathMatch: 'full',
          }
          
        ],
        data: {
          showHeader: true,
          showFooter: false,
        }
      },
      { path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full',
        data: {
          showHeader: true,
          showFooter: false,
        } 
      },
    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}