import { Component, OnInit } from '@angular/core';

import { ConnectorService } from './../../services/connector.service';
@Component({
  selector: 'app-daily-count',
  templateUrl: './daily-count.component.html',
  styleUrls: ['./daily-count.component.scss'],
  providers: [ConnectorService]
})
export class DailyCountComponent implements OnInit {

  record: any;

  constructor(private wildService: ConnectorService) { }

  ngOnInit() {
    this.record = this.wildService.getData();
    // this.record.subscribe(res => {
    //   if (!res) {
    //     return;
    //   }
    //   this.dataSource = new MatTableDataSource(res.response);
    // });
    this.record.subscribe(res => console.log(res.response));
  }

}
