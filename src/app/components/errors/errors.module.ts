import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatButtonToggleModule } from '@angular/material';
  import { MyDatePickerModule } from 'mydatepicker';
  import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ErrorsComponent, ErrorDetailsComponent } from './errors.component';
import { ErrorsRoutingModule } from './errors-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ErrorsRoutingModule,
    MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
    MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
    MatButtonToggleModule,
    MyDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [ ErrorsComponent, ErrorDetailsComponent ]
})
export class ErrorsModule { }
