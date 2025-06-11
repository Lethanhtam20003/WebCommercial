import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
	selector: 'app-custom-ng-select',
	templateUrl: './custom-ng-select.component.html',
	styleUrls: ['./custom-ng-select.component.scss'],
})
export class CustomNgSelectComponent {
	@Input() items: any[] = [];
	@Input() bindLabel: string = 'name';
	@Input() bindValue: string = 'id';
	@Input() placeholder: string = 'Chọn...';
	@Input() multiple = false;
	@Input() clearable = true;
	@Input() searchable = true;
	@Input() closeOnSelect = true;
	@Input() disabled = false;

	@Input() model: any;
	@Output() modelChange = new EventEmitter<any>();

	onModelChange(value: any) {
		this.modelChange.emit(value);
	}
}
