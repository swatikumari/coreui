import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {IMyDpOptions} from 'mydatepicker';

import { ConnectorService } from '../../services/connector.service';
import { ExcelService } from '../../services/excel.service';

import * as shpwrite from 'shp-write';


@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.scss'],
  providers: [ConnectorService]
})
export class CompensationComponent implements OnInit {

  options;
  record: any;
  dataSource: any;
  fromDate;
  toDate;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  constructor(private wildService: ConnectorService, private excelService: ExcelService, private spinnerService: Ng4LoadingSpinnerService) { }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};

  // displayedCol = [
  //   'DC_METAINSTANCE_ID',
  //   'DC_DEVICE_ID',
  //   'DC_SIMCARD_ID',
  //   'DC_PHONE_NUMBER',
  //   'DC_CASE_ID',
  //   'DC_USER_NAME'
  // ];

  displayedCol = ["DC_METAINSTANCE_ID",
         "DC_DEVICE_ID",
         "DC_USER_NAME",
         "DC_NH_CASES",
         "DC_BP_CASES",
         "DC_TOTAL_CASES"
        ]
  ngOnInit() {
    //this.downloadShapeFile();
    this.spinnerService.show();
    this.record = this.wildService.getCompensation_OM();
    this.record.subscribe(res => {
      if (!res) {
        this.spinnerService.hide();
        return;
      }
      this.dataSource = new MatTableDataSource(res.response);
      this.dataSource.paginator = this.paginator;
      this.spinnerService.hide();
    });
  }

  xlsxReport() {
    this.excelService.exportAsExcelFile(this.dataSource.data,  'Compensation');
    return 'success';
  }

 downloadShapeFile(){
// (optional) set names for feature types and zipped folder
this.options = {
  folder: 'myshapes',
  types: {
      point: 'mypoints',
      polygon: 'mypolygons',
      line: 'mylines'
  }
}
// a GeoJSON bridge for features
shpwrite.download({
  type: 'FeatureCollection',
  features: [
      {
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [0, 0]
          },
          properties: {
              name: 'Foo'
          }
      },
      {
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [0, 10]
          },
          properties: {
              name: 'Bar'
          }
      }
  ]
}, this.options);
 }

}
