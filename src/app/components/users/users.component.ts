import { Component, OnInit , ViewChild} from '@angular/core';

import { ConnectorService } from './../../services/connector.service';
import { ExcelService } from './../../services/excel.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConnectorService]
})
export class UsersComponent implements OnInit {

  dcFlag = true;
  hwcFlag = false;
  publicityFlag = false;

  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  constructor(private wildService: ConnectorService, private excelService: ExcelService) { }


  ngOnInit() {
   }

}

// import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
// import {DataService} from './../../services/data.service';

// @Component({
//   selector: 'app-post-dialog',
//   templateUrl: './users.component.html',
//  // styleUrls: ['./post-dialog.component.css']
//  providers: [DataService]
// })
// export class UsersComponent  {
//   blogPost = {
//     Username: '',
//     Firstname: '',
//     Lastname: '',
//     position: 0,
//     Category: ''
//   };
//   public event: EventEmitter<any> = new EventEmitter();

//   constructor(
//     public dialogRef: MatDialogRef<UsersComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public dataService: DataService
//   ) {
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSubmit(): void {
//     this.blogPost.position = this.dataService.dataLength();
//     this.event.emit({data: this.blogPost});
//     this.dialogRef.close();
//   }

//   // tslint:disable-next-line:member-ordering
//   categories = this.dataService.getCategories();
// }

