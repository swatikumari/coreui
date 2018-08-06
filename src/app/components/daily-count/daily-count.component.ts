import { Component, OnInit , ViewChild} from '@angular/core';

import { ConnectorService } from './../../services/connector.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-daily-count',
  templateUrl: './daily-count.component.html',
  styleUrls: ['./daily-count.component.scss'],
  providers: [ConnectorService]
})
export class DailyCountComponent implements OnInit {

  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5,10,20,50,100];
  constructor(private wildService: ConnectorService) { }

  displayedCol = [
    'DC_METAINSTANCE_ID',
    'DC_DEVICE_ID',
    'DC_SIMCARD_ID',
    'DC_PHONE_NUMBER',
    'DC_CASE_ID',
    'DC_USER_NAME'
  ];

  ngOnInit() {
    this.record = this.wildService.getData();
    this.record.subscribe(res => {
      if (!res) {
        return;
      }
      this.dataSource = new MatTableDataSource(res.response);
      this.dataSource.paginator = this.paginator;
    });
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
  const csvData = this.ConvertToCSV(this.dataSource);
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

}
