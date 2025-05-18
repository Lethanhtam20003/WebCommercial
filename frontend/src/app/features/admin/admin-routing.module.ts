import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';

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