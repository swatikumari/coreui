import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { PublicityComponent } from './publicity.component';
import { PublicityRoutingModule } from './publicity-routing.module';

@NgModule({
  imports: [

PublicityRoutingModule
  ],
  declarations: [ PublicityComponent ]
})
export class PublicityModule { }
