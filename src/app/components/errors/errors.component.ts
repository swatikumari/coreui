import {Component, ViewChild, Inject, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,
  MatPaginator, MatTableDataSource} from '@angular/material';
import { AddUserService } from '../../services/addUser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectorService } from './../../services/connector.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
/**
 * @title Dialog Overview
 */
@Component({
  templateUrl: 'errors.component.html',
  styleUrls: ['errors.component.scss'],
  providers: [ConnectorService]
})
export class ErrorsComponent implements OnInit {

  record: any;
  record1: any;
  dataSource: any;
  modalRef: BsModalRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(public dialog: MatDialog, private modalService: BsModalService, private spinnerService: Ng4LoadingSpinnerService, private wildService: ConnectorService) {
  }

  displayedCol: any;



  openModal(lgModal, pid: any, did: any) {
    // this.modalRef = this.modalService.show(template);
    lgModal.show();
    this.record =  this.wildService.getParentRecord(pid);
    this.record.subscribe(res => {
      console.log(res.response[0]);
      this.dataSource = res.response[0];
    });
    this.record1 = this.wildService.getDuplicateRecord(did);
    this.record1.subscribe(res => {
      console.log(res.response);
    });

  }

  openUpdate(data): void {
    let dialogRef = this.dialog.open(ErrorDetailsComponent, {
      width: '400px',
      data: data
    });

  }


  ngOnInit() {
    this.spinnerService.show();
    this.getTable();
  }

  getTable(){
    this.record = this.wildService.getErrorRecords();
    this.record.subscribe(res => {
      if (!res) {
        this.spinnerService.hide();
        return;
      }
      this.dataSource = res.response;
      this.displayedCol = ["HWC_ORG_METAID", "HWC_DUP_METAID",  "Action"];
      //this.dataSource.paginator = this.paginator;
      this.spinnerService.hide();
    });
  }

  // deleteUser(username) {
  //   this.addUser.deleteUser(username).subscribe(() => {
  //     this.fetchUser();
  //   });
  // }

}


@Component({
  templateUrl: 'errors-dialogue.component.html',
  styleUrls: ['errors-dialogue.component.scss'],
  providers: [ConnectorService]
})
export class ErrorDetailsComponent implements OnInit{

  record: any;
  createForm: FormGroup;
  private formSubmitAttempt: boolean;
  dataSource: any;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private wildService: ConnectorService,
    private fb: FormBuilder,
    private router: Router
  ) {


  }

  Form() {
    this.createForm = this.fb.group({
      HWC_METAINSTANCE_ID: [''],
      HWC_METAMODEL_VERSION: ['', Validators.required],
      HWC_METAUI_VERSION: ['', Validators.required],
      HWC_METASUBMISSION_DATE: ['', Validators.required],
      HWC_WSID: ['',Validators.required],
      HWC_FIRST_NAME: ['', Validators.required],
      HWC_FULL_NAME:['', Validators.required],
      HWC_PARK_NAME:['', Validators.required],
      HWC_TALUK_NAME:['', Validators.required],
      HWC_VILLAGE_NAME:['', Validators.required],
      HWC_OLDPHONE_NUMBER:['', Validators.required],
      HWC_NEWPHONE_NUMBER:['', Validators.required],
      HWC_SURVEY_NUMBER: ['', Validators.required],
      HWC_RANGE:['', Validators.required],
      HWC_LATITUDE:['', Validators.required],
      HWC_LONGITUDE:['', Validators.required],
      HWC_ALTITUDE:['', Validators.required],
      HWC_ACCURACY:['', Validators.required],
      HWC_CASE_DATE:['', Validators.required],
      HWC_CASE_CATEGORY:['', Validators.required],
      HWC_ANIMAL:['', Validators.required],
      HWC_HI_NAME:['', Validators.required],
      HWC_HI_VILLAGE:['', Validators.required],
      HWC_HI_AREA:['', Validators.required],
      HWC_HI_DETAILS:['', Validators.required],
      HWC_HD_NAME:['', Validators.required],
      HWC_HD_VILLAGE:['', Validators.required],
      HWC_HD_DETAILS:['', Validators.required],
      HWC_COMMENT:['', Validators.required],
      HWC_FD_SUB_DATE:['', Validators.required],
      HWC_FD_SUB_RANGE:['', Validators.required],
      HWC_FD_NUM_FORMS:['', Validators.required],
      HWC_FD_COMMENT:['', Validators.required],
      HWC_START:['', Validators.required],
      HWC_END:['', Validators.required],
      HWC_DEVICE_ID:['', Validators.required],
      HWC_SIMCARD_ID:['', Validators.required],
      HWC_FA_PHONE_NUMBER:['', Validators.required],
      HWC_USER_NAME:['', Validators.required],
      HWC_CASE_TYPE:['', Validators.required]
    })
  }


  ngOnInit(){
    this.record = this.wildService.getParentRecord(this.data.HWC_ORG_METAID);
    this.record.subscribe(res => {
      this.dataSource = res.response[0];
    });
    this.createForm.get('HWC_METAINSTANCE_ID').setValue(this.dataSource.HWC_METAINSTANCE_ID);
    this.createForm.get('HWC_METAMODEL_VERSION').setValue(this.dataSource.HWC_METAMODEL_VERSION);
    this.createForm.get('HWC_METAUI_VERSION').setValue(this.dataSource.HWC_METAUI_VERSION);
    // this.createForm.get('phonenumber').setValue(this.dataSource.Phone_number);
    // this.createForm.get('email').setValue(this.dataSource.Email_id);
    // this.createForm.get('password').setValue(this.dataSource.User_pwd);

     this.createForm.get('HWC_METASUBMISSION_DATE').setValue(this.dataSource.HWC_METASUBMISSION_DATE);
     this.createForm.get('HWC_WSID').setValue(this.dataSource.HWC_WSID);
     this.createForm.get('HWC_FIRST_NAME').setValue(this.dataSource.HWC_FIRST_NAME);
     this.createForm.get('HWC_FULL_NAME').setValue(this.dataSource.HWC_FULL_NAME);
     this.createForm.get('HWC_PARK_NAME').setValue(this.dataSource.HWC_PARK_NAME);
     this.createForm.get('HWC_TALUK_NAME').setValue(this.dataSource.HWC_TALUK_NAME);
     this.createForm.get('HWC_VILLAGE_NAME').setValue(this.dataSource.HWC_VILLAGE_NAME);
     this.createForm.get('HWC_OLDPHONE_NUMBER').setValue(this.dataSource.HWC_OLDPHONE_NUMBER);
     this.createForm.get('HWC_NEWPHONE_NUMBER').setValue(this.dataSource.HWC_NEWPHONE_NUMBER);
     this.createForm.get('HWC_SURVEY_NUMBER').setValue(this.dataSource.HWC_SURVEY_NUMBER);
     this.createForm.get('HWC_RANGE').setValue(this.dataSource.HWC_RANGE);
     this.createForm.get('HWC_LATITUDE').setValue(this.dataSource.HWC_LATITUDE);
     this.createForm.get('HWC_LONGITUDE').setValue(this.dataSource.HWC_LONGITUDE);
     this.createForm.get('HWC_ALTITUDE').setValue(this.dataSource.HWC_ALTITUDE);
     this.createForm.get('HWC_ACCURACY').setValue(this.dataSource.HWC_ACCURACY);
     this.createForm.get('HWC_CASE_DATE').setValue(this.dataSource.HWC_CASE_DATE);





      // HWC_ACCURACY:['', Validators.required],
      // HWC_CASE_DATE:['', Validators.required],
      // HWC_CASE_CATEGORY:['', Validators.required],
      // HWC_ANIMAL:['', Validators.required],
      // HWC_HI_NAME:['', Validators.required],
      // HWC_HI_VILLAGE:['', Validators.required],
      // HWC_HI_AREA:['', Validators.required],
      // HWC_HI_DETAILS:['', Validators.required],
      // HWC_HD_NAME:['', Validators.required],
      // HWC_HD_VILLAGE:['', Validators.required],
      // HWC_HD_DETAILS:['', Validators.required],
      // HWC_COMMENT:['', Validators.required],
      // HWC_FD_SUB_DATE:['', Validators.required],
      // HWC_FD_SUB_RANGE:['', Validators.required],
      // HWC_FD_NUM_FORMS:['', Validators.required],
      // HWC_FD_COMMENT:['', Validators.required],
      // HWC_START:['', Validators.required],
      // HWC_END:['', Validators.required],
      // HWC_DEVICE_ID:['', Validators.required],
      // HWC_SIMCARD_ID:['', Validators.required],
      // HWC_FA_PHONE_NUMBER:['', Validators.required],
      // HWC_USER_NAME:['', Validators.required],
      // HWC_CASE_TYPE:['', Validators.required]
  }

  isFieldInvalid(field: string) {
    return (
      (!this.createForm.get(field).valid && this.createForm.get(field).touched) ||
      (this.createForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // createUser(firstname, lastname, username, phone, email, password, roleid){
  //   this.dialogRef.close();
  //   this.addUser.createUser(firstname, lastname, username, phone, email, password, roleid).subscribe(() => {
  //       this.router.navigate['/user']
  //     });
  // }

}
