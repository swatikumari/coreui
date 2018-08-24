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

getDailyCountUsers(): Observable<any> {
  // console.log('Hello World');
  return this.http.get<any>(this.uri + 'getallDC');
}
getCompensation_OM(): Observable<any> {
  // console.log('Hello World');
  return this.http.get<any>(this.uri + 'getCompensation_OM');
}
getReport(): Observable<any> {

  return this.http.get<any>(this.uri);
}
getPublicity(): Observable<any> {
  return this.http.get<any>(this.uri + 'getpublicity');
}
getDCreportbyrange(fromDate, toDate): Observable<any> {

  return this.http.post<any>(this.uri+ "getDCreportbyrange", {fromdate:fromDate, todate:toDate});
}
getDCreportbyMonth(): Observable<any> {

  return this.http.get<any>(this.uri+ 'getDCreportbyMonth');
}
getDCreportbyday(): Observable<any> {

  return this.http.get<any>(this.uri+ 'getDCreportbyday');
}
getHWC(): Observable<any> {
  return this.http.get<any>(this.uri + 'gethwc');
}
getcase_users(): Observable<any> {
  return this.http.get<any>(this.uri + 'getcase_users');
}
getHWCreport_bycases(): Observable<any> {
  return this.http.get<any>(this.uri + 'getHWCreport_bycases');
}
getHWCreport_byday(): Observable<any> {
  return this.http.get<any>(this.uri + 'getHWCreport_byday');
}
getHWCreport_bycases_range(fromDate, toDate): Observable<any> {
  return this.http.post<any>(this.uri + 'getHWCreport_bycases_range', {fromdate:fromDate, todate:toDate});
}
getHWCreport_byday_range(fromDate, toDate): Observable<any> {
  return this.http.post<any>(this.uri + 'getHWCreport_byday_range', {fromdate:fromDate, todate:toDate});
}
getHWCreport_byspacial_range(fromDate, toDate): Observable<any> {
  return this.http.post<any>(this.uri + 'getHWCreport_byspacial_range', {fromdate:fromDate, todate:toDate});
}
}


