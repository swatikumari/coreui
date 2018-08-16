import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatButtonToggleModule } from '@angular/material';
  import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { CaseUsersComponent } from './caseUsers.component';
import { CaseUsersRoutingModule } from './caseUsers-routing.module';

@NgModule({
  imports: [
    CaseUsersRoutingModule,
    MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
    MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [ CaseUsersComponent ]
})
export class CaseUsersModule { }
