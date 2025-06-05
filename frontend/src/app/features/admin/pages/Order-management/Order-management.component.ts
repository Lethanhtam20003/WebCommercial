import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	imports: [RouterOutlet],
	selector: 'app-Order-management',
	templateUrl: './Order-management.component.html',
	styleUrls: ['./Order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
	constructor() {}
	ngOnInit(): void {}
}
