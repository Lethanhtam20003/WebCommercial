import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [RouterModule],
    standalone: true,
})
export class DashboardComponent {
    constructor() { }
}