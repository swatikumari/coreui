import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Data } from '../models/data.model';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable(
  // providedIn: 'root'
)


export class ConnectorService {

  private uri = 'https://nodecleaner.azurewebsites.net/';

  constructor(private http: HttpClient) { }

getDailyCountUsers(): Observable<Data[]> {
  // console.log('Hello World');
  return this.http.get<Data[]>(this.uri + 'getallDC');
}

getReport(): Observable<Data[]> {

  return this.http.get<Data[]>(this.uri);
}
getPublicity(): Observable<any> {
  return this.http.get<any>(this.uri + 'getpublicity');
}
}
