import {Component, Inject, EventEmitter, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MatTableDataSource} from '@angular/material';
import { AddUserService } from '../../services/addUser.service';
import { AddUser } from '../../models/addUser';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/table';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * @title Dialog Overview
 */
@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {

   users: any;

  constructor(private addUser: AddUserService, public dialog: MatDialog, private router: Router) {
  }

  displayedColumns = ['firstname', 'lastname', 'username', 'phone', 'email', 'actions'];
  dataSource: any;

  openCreate(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchUser();
    })


  }


  openUpdate(data): void {
    let dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '400px',
      data: data
    });

  }

  fetchUser() {
    this.users = this.addUser.getUser()
    this.users.subscribe((data) => {
      this.dataSource = data.response;
      console.log(this.dataSource);
    })
  }

  ngOnInit() {
    this.fetchUser();
  }


  deleteUser(username) {
    this.addUser.deleteUser(username).subscribe(() => {
      this.fetchUser();
    });
  }

}


@Component({
  templateUrl: 'users-dialogue.component.html',
  styleUrls: ['users-dialogue.component.scss']
})
export class UserCreateComponent {

  createForm: FormGroup;
  private formSubmitAttempt: boolean;

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addUser: AddUserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    phonenumber: ['',Validators.required],
    password: ['', Validators.required],
    roleid: ['', Validators.required]
    })
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

  createUser(firstname, lastname, username, phone, email, password, roleid){
    this.dialogRef.close();
    this.addUser.createUser(firstname, lastname, username, phone, email, password, roleid).subscribe(() => {
        this.router.navigate['/user']
      });
  }

}

@Component({
    templateUrl: 'users-update.component.html',
    styleUrls: ['users-dialogue.component.scss']
  })
  export class UserUpdateComponent implements OnInit{

    public event: EventEmitter<any> = new EventEmitter();

    updateForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<UsersComponent>,
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
