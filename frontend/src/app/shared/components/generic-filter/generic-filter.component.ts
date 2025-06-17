import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterField } from './generic-filter-field.interface';
import { CommonModule, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-generic-filter',
	standalone: true,
	imports: [NgSwitchCase, CommonModule, FormsModule],
	templateUrl: './generic-filter.component.html',
	styleUrl: './generic-filter.component.scss',
})
export class GenericFilterComponent {
	@Input() fields: FilterField[] = [];
	@Output() filterChanged = new EventEmitter<any>();
	protected pressedButton: 'filter' | 'remove' | null = null;

	formValues: Record<string, any> = {};

	onSubmit() {
		this.filterChanged.emit({ ...this.formValues });
	}

	onClear() {
		this.formValues = {};
		this.filterChanged.emit({});
	}

	onPress(button: 'filter' | 'remove'): void {
		this.pressedButton = button;
	}

	onRelease(button: 'filter' | 'remove'): void {
		if (this.pressedButton === button) {
			this.pressedButton = null;
		}
	}
}
