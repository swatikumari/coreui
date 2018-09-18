import { Component, OnInit, ViewChild } from '@angular/core';


import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ConnectorService } from '../../services/connector.service';
import { ExcelService } from '../../services/excel.service';
import * as GeoJSON from 'geojson';
import * as tokml from 'tokml';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-hwc',
  templateUrl: './hwc.component.html',
  styleUrls: ['./hwc.component.scss'],
  providers: [ConnectorService]
})
export class HwcComponent implements OnInit {

  geoJsonData = [
    // { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
    // { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
    // { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 },
    // { name: 'Location D', category: 'home', street: 'East', lat: 12.9716, lng: 77.5946 }

  ];
  obj;
  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  constructor(private wildService: ConnectorService, private excelService: ExcelService, private spinnerService: Ng4LoadingSpinnerService) { }

  displayedCol = [
    'HWC_METAINSTANCE_ID',
    'HWC_METASUBMISSION_DATE',
    'HWC_FULL_NAME',
    'HWC_NEWPHONE_NUMBER',
    'HWC_PARK_NAME',
    'HWC_TALUK_NAME',
    'HWC_VILLAGE_NAME',
    'HWC_ANIMAL'
  ];

  ngOnInit() {
    this.spinnerService.show();
    this.record = this.wildService.getHWC();
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

  private saveAsKmlFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer]);
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.kml');
  }

  xlsxReport() {
    this.excelService.exportAsExcelFile(this.dataSource.data,  'HWC');
    return 'success';
  }
  kmlReport(){
    var kmlData={}
    for(let i=0; i<this.dataSource.data.length; i++){
      kmlData = {Name: this.dataSource.data[i].HWC_TALUK_NAME, Park: this.dataSource.data[i].HWC_PARK_NAME,lat:this.dataSource.data[i].HWC_LATITUDE, lng:this.dataSource.data[i].HWC_LONGITUDE}
      this.geoJsonData.push(kmlData);
    }
    this.obj = GeoJSON.parse(this.geoJsonData, {Point: ['lat', 'lng']});
    var kmlNameDescription = tokml(this.obj, {
      name: 'Name',
      description: 'description'
  });
  this.saveAsKmlFile(kmlNameDescription,'HWC' );
  }

}
