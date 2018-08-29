import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    HomeRoutingModule,
    ChartsModule,
    FormsModule,
    AgmJsMarkerClustererModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDm70lDa9nBtdLFCkYGOCKTY6ghftpmyhU'
    })
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }

