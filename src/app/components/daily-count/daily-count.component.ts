import { Component, OnInit , ViewChild} from '@angular/core';

import { ConnectorService } from '../../services/connector.service';
import { ExcelService } from '../../services/excel.service';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as GeoJSON from 'geojson';
import * as tokml from 'tokml';
import * as FileSaver from 'file-saver';


// var GeoJSON = require('geojson');
// var tokml =  require('tokml');

@Component({
  selector: 'app-daily-count',
  templateUrl: './daily-count.component.html',
  styleUrls: ['./daily-count.component.scss'],
  providers: [ConnectorService]
})
export class DailyCountComponent implements OnInit {

   geoJsonData = [
    { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
    { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
    { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 },
    { name: 'Location D', category: 'home', street: 'East', lat: 12.9716, lng: 77.5946 }

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
    'DC_METAINSTANCE_ID',
    'DC_DEVICE_ID',
    'DC_SIMCARD_ID',
    'DC_FA_ID',
    'DC_CASE_ID',
    'DC_USER_NAME'
  ];

  ngOnInit() {
  //   this.obj = GeoJSON.parse(this.geoJsonData, {Point: ['lat', 'lng']});
  //   var kmlNameDescription = tokml(this.obj, {
  //     name: 'name',
  //     description: 'description'
  // });
  // this.saveAsKmlFile(kmlNameDescription,'Sample' );
    this.spinnerService.show();
    this.record = this.wildService.getDailyCountUsers();
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

  ConvertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
    let row = '';

     // tslint:disable-next-line:forin
     for (const index in objArray[0]) {
         // Now convert each value to string and comma-separated
         row += index + ',';
     }
     row = row.slice(0, -1);
     // append Label row with line break
     str += row + '\r\n';

     for (let i = 0; i < array.length; i++) {
        let line = '';
         // tslint:disable-next-line:forin
         for (const index in array[i]) {
             // tslint:disable-next-line:curly
             if (line !== '') line += ',';

             line += array[i][index];
         }
         str += line + '\r\n';
     }
     return str;
 }

 download() {
  const csvData = this.ConvertToCSV(this.dataSource.data);
                         const a = document.createElement('a');
                          a.setAttribute('style', 'display:none;');
                          document.body.appendChild(a);
                         const blob = new Blob([csvData], { type: 'text/csv' });
                         const url = window.URL.createObjectURL(blob);
                          a.href = url;
                          a.download = 'Daily_count.csv'; /* your file name*/
                          a.click();
                          return 'success';
  }

  xlsxReport() {
    this.excelService.exportAsExcelFile(this.dataSource.data,  'DailyCount');
    return 'success';
  }

}
