import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonFormConfig } from './json-form.interfaces';

@Component({
  selector: 'nlrb-json-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div class="grid gap-10" [formGroup]="form">
      <div class="grid gap-4 items-start">
        <ng-container *ngFor="let field of formConfig.fields">
          <div class="field" [ngStyle]="{ 'grid-column': 'span ' + field.span }">
            <label [for]="field.name" class="block mb-1">
              {{ field.label }}
              <span *ngIf="isRequired(field.name)" class="text-error">*</span>
            </label>

            <ng-container [ngSwitch]="field.type">
              <!-- Text, Email, Phone, Number inputs -->
              <input *ngSwitchCase="'text'"
                [id]="field.name"
                [type]="field.type"
                [formControlName]="field.name"
                [placeholder]="field.placeholder || ''"
                class="f-inputs"
                [class.k-readonly]="field.readonly">

              <input *ngSwitchCase="'email'"
                [id]="field.name"
                type="email"
                [formControlName]="field.name"
                [placeholder]="field.placeholder || ''"
                class="f-inputs"
                [class.k-readonly]="field.readonly">

              <input *ngSwitchCase="'phone'"
                [id]="field.name"
                type="tel"
                [formControlName]="field.name"
                [placeholder]="field.placeholder || ''"
                class="f-inputs"
                [class.k-readonly]="field.readonly">

              <input *ngSwitchCase="'number'"
                [id]="field.name"
                type="number"
                [formControlName]="field.name"
                [placeholder]="field.placeholder || ''"
                class="f-inputs"
                [class.k-readonly]="field.readonly">

              <!-- Select -->
              <select *ngSwitchCase="'select'"
                [id]="field.name"
                [formControlName]="field.name"
                class="f-inputs f-dropdownlist">
                <option [ngValue]="null">{{ defaultItem?.label || '- Select -' }}</option>
                <option *ngFor="let option of field.options" [value]="option.value">
                  {{ option.label }}
                </option>
              </select>

              <!-- Checkbox -->
              <div *ngSwitchCase="'checkbox'" class="checkbox-div">
                <input [id]="field.name"
                  type="checkbox"
                  [formControlName]="field.name"
                  class="checkbox-input">
                <label [for]="field.name">{{ field.label }}</label>
              </div>

              <!-- Date -->
              <input *ngSwitchCase="'date'"
                [id]="field.name"
                type="date"
                [formControlName]="field.name"
                class="f-inputs f-datepicker"
                [min]="formatDate(minDate)"
                [max]="formatDate(maxDate)">
            </ng-container>

            <!-- Error Messages -->
            <div *ngIf="shouldShowError(field.name)" class="text-sm text-error mt-1">
              {{ getErrorMessage(field.name) }}
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .grid { display: grid; }
    .gap-10 { gap: 2.5rem; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .items-start { align-items: start; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .block { display: block; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mt-1 { margin-top: 0.25rem; }
    .text-sm { font-size: 0.875rem; }
    .text-error { color: #c92d2d; }

    .field {
      display: block;
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
      justify-content: start;
      position: relative;
    }

    .f-inputs {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    .f-inputs:focus {
      border-color: #2690fb;
      outline: 2px solid #2690fb;
    }

    .k-readonly {
      background-color: #f0f0f0;
    }

    .checkbox-div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .checkbox-input {
      width: 1.25rem;
      height: 1.25rem;
    }

    .f-datepicker,
    .f-dropdownlist {
      width: 100%;
      padding: 0.5rem;
    }

    input.ng-invalid.ng-dirty,
    select.ng-invalid.ng-dirty {
      border-color: #c92d2d;
      outline: 2px solid #c92d2d;
    }
  `]
})
export class JsonFormComponent {
  @Input() formConfig!: JsonFormConfig;
  @Input() defaultItem?: { value: any; label: string };
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  constructor(private controlContainer: ControlContainer) {}

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  isRequired(fieldName: string): boolean {
    const control = this.form?.get(fieldName);
    if (!control) return false;
    return control.hasValidator(Validators.required);
  }

  shouldShowError(fieldName: string): boolean {
    const control = this.form?.get(fieldName);
    if (!control) return false;
    return control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form?.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Please enter a valid email';
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['pattern']) return 'Invalid format';

    return 'Invalid value';
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }
}