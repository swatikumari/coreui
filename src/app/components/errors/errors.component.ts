import { Component, OnInit, Inject, EventEmitter, ViewChild } from '@angular/core';
import { ConnectorService } from '../../services/connector.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExcelService } from '../../services/excel.service';
import { AddUserService } from '../../services/addUser.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(private wildService: ConnectorService, private excelService: ExcelService, private spinnerService: Ng4LoadingSpinnerService) { }

  displayedCol = [
    'PB_DEVICE_ID',
    'PB_USER_NAME',
    'PB_V_DATE',
    'PB_PARK',
    'PB_TALUK',
    'PB_VILLAGE_1',
  ];

  ngOnInit() {
    this.spinnerService.show();
    this.record = this.wildService.getPublicity();
    this.record.subscribe(res => {
      if (!res) {
        this.spinnerService.hide();
        return;
      }
      this.dataSource = new MatTableDataSource(res.response);
      this.dataSource.paginator = this.paginator;
      this.spinnerService.hide();
    });
  }

  xlsxReport() {
    this.excelService.exportAsExcelFile(this.dataSource.data,  'Publicity');
    return 'success';
  }

}


@Component({
  templateUrl: 'errors-dialogue.component.html',
  styleUrls: ['errors-dialogue.component.scss']
})
export class ErrorDetailsComponent implements OnInit{

  public event: EventEmitter<any> = new EventEmitter();

  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addUser: AddUserService,
    private fb: FormBuilder,
    private  router: Router
  ) {
    this.createForm();
    console.log(this.data);
  }



  createForm() {
    this.updateForm = this.fb.group({
      username: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    phonenumber: ['',Validators.required],
    password: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


updateUser(firstname, lastname, username, phone, email, password){
  this.dialogRef.close();
  this.addUser.updateUser(firstname, lastname, username, phone, email, password).subscribe((res) => {
    console.log(res);
    this.router.navigate['/user']
  });
}

  ngOnInit() {
    this.updateForm.get('firstname').setValue(this.data.First_name);
    this.updateForm.get('lastname').setValue(this.data.Last_name);
    this.updateForm.get('username').setValue(this.data.User_name);
    this.updateForm.get('phonenumber').setValue(this.data.Phone_number);
    this.updateForm.get('email').setValue(this.data.Email_id);
    this.updateForm.get('password').setValue(this.data.User_pwd);
  }

}

