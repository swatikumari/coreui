import {Component, Inject, EventEmitter, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MatTableDataSource} from '@angular/material';
import { AddUserService } from '../../services/addUser.service';
import { AddUser } from '../../models/addUser';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/table';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



/**
 * @title Dialog Overview
 */
@Component({
  // selector: 'dialog-overview-example',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {

  record: any;

  constructor(private addUser: AddUserService, public dialog: MatDialog) {
  }

  displayedColumns = ['firstname', 'lastname', 'username', 'phone', 'email', 'delete'];
  dataSource: any;

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: 'Add Post'
    });
    // dialogRef.componentInstance.event.subscribe((result) => {
    //   this.addUser.addPost(result.data);
    // //  this.dataSource = this.addUser.getUser();
    // });
  }

  ngOnInit() {
    this.record = this.addUser.getUser();
    this.record.subscribe(res => {
      if (!res) {
        return;
      }
      this.dataSource = new MatTableDataSource(res.response);
    });
  }
}
// export class PostDataSource extends DataSource<any> {
//     constructor(private addUser: AddUserService) {
//       super();
//     }

//     connect(): Observable<AddUser[]> {
//       return this.addUser.getData();
//     }

//   disconnect() {
//   }

// }

@Component({
//  selector: 'dialog-overview-example-dialog',
  templateUrl: 'users-dialogue.component.html',
  styleUrls: ['users-dialogue.component.scss']
})
export class UserDialogComponent {
  blogPost = {
    username: '',
    firstname: '',
    lastname: '',
    category: '',
    email: '',
    phone: null,
    password: ''
  };
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addUser: AddUserService
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm){
//    this.blogPost.position = this.addUser.dataLength();
    this.event.emit({data: this.blogPost});
    this.dialogRef.close();
    this.addUser.createUser(form.value.firstname, form.value.lastname,
      form.value.username, form.value.phone,
      form.value.email,form.value.password,
      form.value.category);
  }



  // tslint:disable-next-line:member-ordering
//  categories = this.addUser.getCategories();
}
