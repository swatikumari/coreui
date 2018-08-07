import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectorService } from './../../services/connector.service';
import { ExcelService } from './../../services/excel.service';

import { MatTableDataSource, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.component.html',
  styleUrls: ['./publicity.component.scss'],
  providers: [ConnectorService]
})
export class PublicityComponent implements OnInit {


  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(private wildService: ConnectorService, private excelService: ExcelService) { }

  displayedCol = [
    // 'DC_METAINSTANCE_ID',
    // 'DC_DEVICE_ID',
    // 'DC_SIMCARD_ID',
    // 'DC_PHONE_NUMBER',
    // 'DC_CASE_ID',
    // 'DC_USER_NAME'
    'PB_DEVICE_ID',
    'PB_USER_NAME',
    'PB_V_DATE',
    'PB_PARK',
    'PB_TALUK',
    'PB_VILLAGE_1'
  ];

  ngOnInit() {
    this.record = this.wildService.getPublicity();
    this.record.subscribe(res => {
      if (!res) {
        return;
      }
      this.dataSource = new MatTableDataSource(res.response);
      this.dataSource.paginator = this.paginator;
    });
  }

  xlsxReport() {
    this.excelService.exportAsExcelFile(this.dataSource.data,  'DailyCount');
    return 'success';
  }


}
