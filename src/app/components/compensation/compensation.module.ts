import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CompensationComponent } from './compensation.component';
import { CompRoutingModule } from './comp-routing.module';

@NgModule({
  imports: [
    CompRoutingModule
  ],
  declarations: [ CompensationComponent ]
})
export class CompesationModule { }
