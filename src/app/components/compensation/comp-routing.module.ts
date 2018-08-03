import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompensationComponent } from './compensation.component';

const routes: Routes = [
  {
    path: '',
    component: CompensationComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompRoutingModule {}
