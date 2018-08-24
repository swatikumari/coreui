import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent, UserUpdateComponent } from './users.component';
import { UserCreateComponent } from './users.component';

import { UsersRoutingModule } from './users-routing.module';
import { MatToolbarModule, MatTableModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule,
  MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTabsModule,
  MatDialogModule,
MatButtonToggleModule,
  MatSelectModule, } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
ReactiveFormsModule,
CommonModule
  ],
  declarations: [ UsersComponent, UserCreateComponent, UserUpdateComponent ]
})
export class UsersModule { }
