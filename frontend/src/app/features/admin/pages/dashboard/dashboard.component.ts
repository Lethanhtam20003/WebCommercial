import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../../admin-sidebar/admin-sidebar.component';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [RouterModule, AdminSidebarComponent],
    standalone: true,
})
export class DashboardComponent {
    constructor() { }
}