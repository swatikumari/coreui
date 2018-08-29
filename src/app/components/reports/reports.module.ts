import { NgModule } from '@angular/core';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatButtonToggleModule } from '@angular/material';
  import { MyDatePickerModule } from 'mydatepicker';
  import{FormsModule} from '@angular/forms'
  import {CommonModule} from '@angular/common';
  import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  imports: [

ReportsRoutingModule,
MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
MatButtonToggleModule,
MyDatePickerModule,
CommonModule,
FormsModule,
Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [ ReportsComponent ]
})
export class ReportsModule { }
