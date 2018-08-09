import { Component, OnInit , ViewChild} from '@angular/core';

import { ConnectorService } from './../../services/connector.service';
import { ExcelService } from './../../services/excel.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConnectorService]
})
export class UsersComponent implements OnInit {

  dcFlag = true;
  hwcFlag = false;
  publicityFlag = false;

  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];
  constructor(private wildService: ConnectorService, private excelService: ExcelService) { }


  ngOnInit() {
   }

}
