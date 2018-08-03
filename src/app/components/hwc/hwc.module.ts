import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HwcComponent } from './hwc.component';
import { HwcRoutingModule } from './hwc-routing.module';

@NgModule({
  imports: [
  HwcRoutingModule
  ],
  declarations: [ HwcComponent ]
})
export class HwcModule { }
