import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
	standalone: true,
	imports: [CommonModule, FormsModule, NgSelectModule],
	selector: 'app-custom-ng-select',
	templateUrl: './custom-ng-select.component.html',
	styleUrls: ['./custom-ng-select.component.scss'],
	providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomNgSelectComponent),
    multi: true,
  },
],

})
export class CustomNgSelectComponent implements ControlValueAccessor {
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
		this.value = value;
  this.onChange(value); // 👈 Cập nhật vào FormControl
  this.modelChange.emit(value); // (tuỳ chọn nếu vẫn muốn dùng modelChange)
	}
	value: any;
	onChange: any = () => {};
	onTouched: any = () => {};

	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
