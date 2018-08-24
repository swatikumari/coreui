import { Component, OnInit , ViewChild} from '@angular/core';

import { ConnectorService } from '../../services/connector.service';
import { ExcelService } from '../../services/excel.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ConnectorService]
})
export class ReportsComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};

  fromDate: any;
  toDate: any;
  case:any = "case1";
  caseList:any= ["case1", "case2"]
  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(private wildService: ConnectorService, private excelService: ExcelService) { }

  displayedCol = [
    'DC_METAINSTANCE_ID',
    'DC_DEVICE_ID',
    'DC_SIMCARD_ID',
    'DC_PHONE_NUMBER',
    'DC_CASE_ID',
    'DC_USER_NAME'
  ];

  ngOnInit() {

  }

  xlsxReport(data) {
if(this.fromDate != null && this.toDate !=null){

  // var fday = this.fromDate.getDate();
  // var fmonthIndex = this.fromDate.getMonth();
  // var fyear = this.fromDate.getFullYear();
  // var tday = this.toDate.getDate();
  // var tmonthIndex = this.toDate.getMonth();
  // var tyear = this.toDate.getFullYear();
  // this.record = this.wildService.getDcByRange(fyear+"-"+fmonthIndex+"-"+fday, tyear+"-"+tmonthIndex+"-"+tday);
  this.record = this.wildService.getDcByRange(this.fromDate.formatted, this.toDate.formatted);

  this.record.subscribe(res => {
    if (!res) {
      return;
    }
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    if(this.dataSource.data){
      this.excelService.exportReport(this.dataSource.data,  'Reports');
      return 'success';
    }else{
      alert("No data to export");
    }
  });
}else if(this.case == "case1"){
  this.record = this.wildService.getDcByCase1();
  this.record.subscribe(res => {
    if (!res) {
      return;
    }
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    if(this.dataSource.data){
      this.excelService.exportReport(this.dataSource.data,  'Reports');
      return 'success';
    }else{
      alert("No data to export");
    }
  });
}

else{

  this.record = this.wildService.getDcByCase2();
  this.record.subscribe(res => {
    if (!res) {
      return;
    }
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    if(this.dataSource.data){
      this.excelService.exportReport(this.dataSource.data,  'Reports');
      return 'success';
    }else{
      alert("No data to export");
    }
  });
}





  }

}
