import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatButtonToggleModule } from '@angular/material';
  import { MyDatePickerModule } from 'mydatepicker';
  import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { CompensationComponent } from './compensation.component';
import { CompRoutingModule } from './comp-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CompRoutingModule,
    MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
    MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
    MatButtonToggleModule,
    MyDatePickerModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [ CompensationComponent ]
})
export class CompesationModule { }
