import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	imports: [RouterOutlet],
	selector: 'app-Order-management',
	templateUrl: './order-management-admin.component.html',
})
export class OrderManagementComponent implements OnInit {
	constructor() {}
	ngOnInit(): void {}
}
