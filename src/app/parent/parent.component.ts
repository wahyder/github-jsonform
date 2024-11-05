import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedComponent } from '../shared/shared/shared.component';
import { CommonModule } from '@angular/common';

interface SharedForm {
  field1: string;
  field2: string;
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, SharedComponent, FormsModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="parentForm" (ngSubmit)="onSubmit()">
      <div formArrayName="sharedArray">
        <div *ngFor="let group of sharedGroups; let i = index">
          <app-shared [formGroup]="getGroupAt(i)"></app-shared>
          <button type="button" (click)="removeGroup(i)">Remove</button>
        </div>
      </div>
      <button type="button" (click)="addGroup()">Add Group</button>
      <button type="submit" [disabled]="parentForm.invalid">Submit</button>
    </form>
  `,
})
export class ParentComponent {
  parentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.parentForm = this.fb.group({
      sharedArray: this.fb.array([])
    });
  }

  get sharedArray(): FormArray {
    return this.parentForm.get('sharedArray') as FormArray;
  }

  get sharedGroups() {
    return this.sharedArray.controls;
  }

  getGroupAt(index: number): FormGroup {
    return this.sharedArray.at(index) as FormGroup;
  }

  addGroup() {
    const group = this.fb.group<SharedForm>({
      field1: '',
      field2: ''
    });
    this.sharedArray.push(group);
  }

  removeGroup(index: number) {
    this.sharedArray.removeAt(index);
  }

  onSubmit() {
    if (this.parentForm.valid) {
      console.log(this.parentForm.value);
    }
  }
}