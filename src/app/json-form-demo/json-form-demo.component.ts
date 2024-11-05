import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonFormComponent } from '../json-form-component/json-form.component';
import { JsonFormConfig } from '../json-form-component/json-form.interfaces';

@Component({
  selector: 'app-json-form-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonFormComponent],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Dynamic JSON Form Demo</h2>
      
      <form [formGroup]="parentForm" (ngSubmit)="onSubmit()" class="max-w-3xl mx-auto">
        <nlrb-json-form
          [formConfig]="formConfig"
          [defaultItem]="defaultSelectItem"
          [minDate]="minDate"
          [maxDate]="maxDate">
        </nlrb-json-form>
        
        <div class="mt-4">
          <button type="submit" 
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  [disabled]="!parentForm.valid">
            Submit
          </button>
        </div>

        <div *ngIf="submittedData" class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="text-lg font-semibold mb-2">Submitted Data:</h3>
          <pre>{{ submittedData | json }}</pre>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .container {
      max-width: 1200px;
    }
  `]
})
export class JsonFormDemoComponent implements OnInit {
  parentForm: FormGroup;
  submittedData: any = null;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2100, 11, 31);
  defaultSelectItem = { value: null, label: '- Select -' };

  formConfig: JsonFormConfig = {
    columnStartNumbers: [1, 5, 9],
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text' as const,
        number: 1,
        span: 4,
        placeholder: 'Enter first name'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text' as const,
        number: 2,
        span: 4,
        placeholder: 'Enter last name'
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email' as const,
        number: 3,
        span: 4,
        placeholder: 'Enter email'
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'phone' as const,
        number: 4,
        span: 4,
        placeholder: '(___) ___-____'
      },
      {
        name: 'birthDate',
        label: 'Birth Date',
        type: 'date' as const,
        number: 5,
        span: 4
      },
      {
        name: 'department',
        label: 'Department',
        type: 'select' as const,
        number: 6,
        span: 4,
        options: [
          { value: 'it', label: 'IT' },
          { value: 'hr', label: 'HR' },
          { value: 'finance', label: 'Finance' },
          { value: 'marketing', label: 'Marketing' }
        ]
      },
      {
        name: 'employeeId',
        label: 'Employee ID',
        type: 'number' as const,
        number: 7,
        span: 4,
        placeholder: 'Enter employee ID'
      },
      {
        name: 'isActive',
        label: 'Active Employee',
        type: 'checkbox' as const,
        number: 8,
        span: 4
      }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.parentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      department: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      isActive: [false]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.parentForm.valid) {
      this.submittedData = this.parentForm.value;
    }
  }
}