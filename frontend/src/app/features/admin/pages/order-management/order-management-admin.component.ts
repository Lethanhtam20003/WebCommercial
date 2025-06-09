import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
	selector: 'app-Order-management',
	templateUrl: './order-management-admin.component.html',
  styleUrls: [],
})
export class OrderManagementComponent implements OnInit {
	constructor() {}
	ngOnInit(): void {}
}
