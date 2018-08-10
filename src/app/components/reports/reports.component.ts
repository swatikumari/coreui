import { Component, OnInit , ViewChild} from '@angular/core';

import { ConnectorService } from './../../services/connector.service';
import { ExcelService } from './../../services/excel.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {IMyDpOptions} from 'mydatepicker';
 //import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ConnectorService]
})
export class ReportsComponent implements OnInit {

  dcFlag = true;
  hwcFlag = false;
  publicityFlag = false;

  // public myForm: FormGroup;

  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  constructor(private wildService: ConnectorService,
    private excelService: ExcelService,
   ) { }

  public model: any;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
};

  displayedCol = [
    'DC_METAINSTANCE_ID',
    'DC_DEVICE_ID',
    'DC_SIMCARD_ID',
    'DC_PHONE_NUMBER',
    'DC_CASE_ID',
    'DC_USER_NAME'
  ];

  ngOnInit() {

    this.record = this.wildService.getReport();
    this.record.subscribe(res => {
      if (!res) {
        return;
      }
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }


  xlsxReport() {
    if(this.dataSource.data){
      this.excelService.exportReport(this.dataSource.data,  'Reports');
      return 'success';
    }else{
      alert("No data to export");
    }

  }

}
