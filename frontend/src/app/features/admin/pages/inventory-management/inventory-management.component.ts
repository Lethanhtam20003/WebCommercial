import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportInventoryComponent } from '../../components/inventory-management/Import-inventory/Import-inventory.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, ImportInventoryComponent],
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

}
