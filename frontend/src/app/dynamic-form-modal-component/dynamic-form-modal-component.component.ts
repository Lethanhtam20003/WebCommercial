import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicField } from './dynamic-field.interface';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
	selector: 'app-dynamic-form-modal-component',
	imports: [CommonModule, NgIf, ReactiveFormsModule],
	templateUrl: './dynamic-form-modal-component.component.html',
	styleUrl: './dynamic-form-modal-component.component.scss',
})
export class DynamicFormModalComponentComponent implements OnInit {
	@Input() title = 'Thêm mới';
	@Input() fields: DynamicField[] = [];
	@Output() submitted = new EventEmitter<any>();

	show = false;
	form!: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		const group: Record<string, [any, ...any[]] | any[]> = {};

		this.fields.forEach(field => {
			group[field.name] = field.required
				? [field.defaultValue ?? '', Validators.required]
				: [field.defaultValue ?? ''];
		});
		this.form = this.fb.group(group);
	}

	open() {
		this.show = true;
	}

	close() {
		this.show = false;
  this.form.reset();
	}

	submit() {
		if (this.form.invalid) return;
		this.submitted.emit(this.form.value);
		this.close();
	}
}
