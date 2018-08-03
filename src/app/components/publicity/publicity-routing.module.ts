import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicityComponent } from './publicity.component';

const routes: Routes = [
  {
    path: '',
    component: PublicityComponent,
    data: {
      title: 'Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class PublicityRoutingModule {}
