import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        AdminComponent,
        AdminSidebarComponent,
        DashboardComponent
    ]
})
export class AdminModule { }