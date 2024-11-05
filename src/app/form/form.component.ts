import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="json-form">
      <h2>JSON Form Demo</h2>
      <form [formGroup]="jsonForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" type="text" formControlName="name">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email">
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" formControlName="message"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      
      <div *ngIf="formData" class="form-output">
        <h3>Form Output:</h3>
        <pre>{{ formData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .json-form {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
    }
    .form-output {
      margin-top: 20px;
      padding: 15px;
      background: #f5f5f5;
    }
    pre {
      white-space: pre-wrap;
    }
  `]
})
export class FormComponent {
  jsonForm: FormGroup;
  formData: any;

  constructor(private fb: FormBuilder) {
    this.jsonForm = this.fb.group({
      name: [''],
      email: [''],
      message: ['']
    });
  }

  onSubmit() {
    if (this.jsonForm.valid) {
      this.formData = this.jsonForm.value;
    }
  }
}