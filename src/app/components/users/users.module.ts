import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { UserDialogComponent } from './users.component';

import { UsersRoutingModule } from './users-routing.module';
import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatDialogModule,
MatButtonToggleModule,
  MatSelectModule, } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [

UsersRoutingModule,
MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
MatButtonToggleModule,
MatGridListModule, MatMenuModule, MatTabsModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatIconModule,
FormsModule,
CommonModule
  ],
  declarations: [ UsersComponent, UserDialogComponent ]
})
export class UsersModule { }
