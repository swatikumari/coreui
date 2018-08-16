import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AgmCoreModule } from '@agm/core';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HomeRoutingModule,
    ChartsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDm70lDa9nBtdLFCkYGOCKTY6ghftpmyhU'
    })
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }

