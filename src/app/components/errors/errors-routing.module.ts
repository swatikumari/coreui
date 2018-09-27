import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorsComponent, ErrorDetailsComponent } from './errors.component';

const routes: Routes = [
  {
    path: 'errors',
    component: ErrorsComponent,
    data: {
      title: 'Errors'
    }
  },
  {
    path: 'verify',
    component: ErrorDetailsComponent
  },
  {
    path: '',
    redirectTo: 'errors',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
