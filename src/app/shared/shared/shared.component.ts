import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div [formGroup]="formGroup">
      <label>
        Field 1:
        <input formControlName="field1" />
      </label>
      <label>
        Field 2:
        <input formControlName="field2" />
      </label>
    </div>
  `,
})
export class SharedComponent {
  @Input() formGroup!: FormGroup;
}