import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DailyCountComponent } from './daily-count.component';
import { DCRoutingModule } from './dc-routing.module';

@NgModule({
  imports: [
    DCRoutingModule
  ],
  declarations: [ DailyCountComponent ]
})
export class DailyCountModule { }
