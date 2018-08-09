import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatButtonToggleModule } from '@angular/material';
  import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { CompensationComponent } from './compensation.component';
import { CompRoutingModule } from './comp-routing.module';

@NgModule({
  imports: [
    CompRoutingModule,
    MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
    MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
    MatButtonToggleModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [ CompensationComponent ]
})
export class CompesationModule { }
