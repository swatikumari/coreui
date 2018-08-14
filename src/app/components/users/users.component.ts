import {Component, Inject, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry} from '@angular/material';
import { AddUserService } from '../../services/addUser.service';
import { AddUser } from '../../models/addUser';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/table';


export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  // selector: 'dialog-overview-example',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent {

  constructor(private addUser: AddUserService, public dialog: MatDialog) {
  }

  displayedColumns = ['Username', 'Firstname', 'Lastname', 'Category', 'delete'];
  dataSource = new PostDataSource(this.addUser);



  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.addUser.addPost(result.data);
      this.dataSource = new PostDataSource(this.addUser);
    });
  }
}
export class PostDataSource extends DataSource<any> {
    constructor(private addUser: AddUserService) {
      super();
    }

    connect(): Observable<AddUser[]> {
      return this.addUser.getData();
    }

  disconnect() {
  }

}

@Component({
//  selector: 'dialog-overview-example-dialog',
  templateUrl: 'users-dialogue.component.html',
})
export class UserDialogComponent {
  blogPost = {
    Username: '',
    Firstname: '',
    Lastname: '',
    position: 0,
    Category: ''
  };
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: AddUserService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.blogPost.position = this.dataService.dataLength();
    this.event.emit({data: this.blogPost});
    this.dialogRef.close();
  }

  // tslint:disable-next-line:member-ordering
  categories = this.dataService.getCategories();
}
