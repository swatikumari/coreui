import { NgModule } from '@angular/core';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatButtonToggleModule } from '@angular/material';

  import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [

ReportsRoutingModule,
MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
MatButtonToggleModule,
MyDatePickerModule,
FormsModule
  ],
  declarations: [ ReportsComponent ]
})
export class ReportsModule { }
