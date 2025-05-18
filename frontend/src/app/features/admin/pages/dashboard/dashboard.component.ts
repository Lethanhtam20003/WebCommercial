import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminBodyComponent } from '../../components/admin-body/admin-body.component';
import { AdminComponent } from "../../admin.component";
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [RouterModule, AdminBodyComponent],
    standalone: true,
})
export class DashboardComponent {
    constructor() { }
}