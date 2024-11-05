import { Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { FormComponent } from './form/form.component';
import { JsonFormDemoComponent } from './json-form-demo/json-form-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form-array', pathMatch: 'full' },
  { path: 'form-array', component: ParentComponent },
  { path: 'json-form', component: FormComponent },
  { path: 'json-form-demo', component: JsonFormDemoComponent }
];