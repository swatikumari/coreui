import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AddUser } from './../models/addUser';

@Injectable()
export class AddUserService {

  ELEMENT_DATA: AddUser[] = [
    // { Position: 1, Username: 'virat123', Firstname: 'Virat', Lastname: 'Kohli', Gmail: 'aatresh@gmail.com', Category: 'User'},
    // { Position: 2, Username: 'sachin123', Firstname: 'Sachin', Lastname: 'Tendulkar', Gmail: 'aatresh@gmail.com', Category: 'User'},
    // { Position: 3, Username: 'saurav123', Firstname: 'Saurav', Lastname: 'Ganguly', Gmail: 'aatresh@gmail.com', Category: 'Web-User'},
    // { Position: 4, Username: 'aatresh123', Firstname: 'Aatresh', Lastname: 'Kulkarni', Gmail: 'aatresh@gmail.com', Category: 'Admin'}
  ];
  categories = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'User', viewValue: 'User'},
    {value: 'Web-User', viewValue: 'Web User'}
  ];

  constructor() {
  }

  getData(): Observable<AddUser[]> {
    return Observable.of<AddUser[]>(this.ELEMENT_DATA);
  }

  getCategories() {
    return this.categories;
  }

  addPost(data) {
    this.ELEMENT_DATA.push(data);
  }

  deletePost(index) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  }
}
