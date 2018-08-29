import { Component, OnInit , ViewChild} from '@angular/core';

import { ConnectorService } from '../../services/connector.service';
import { ExcelService } from '../../services/excel.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {IMyDpOptions} from 'mydatepicker';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ConnectorService]
})
export class ReportsComponent implements OnInit {

  form: FormGroup;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};

  fromDate: any;
  toDate: any;
  dateFlag:boolean = true;
  case:any = "DC_ Byday";
  // caseList:any= ["case1", "case2"]
  categoryType:any="Daily Count";
  caseList:any=["DC_ Byday","DC_ all", "DC_byrange"]
  categoryList:any=["Daily Count", "HWC"];
  record: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPost = 10;
  postPerPage = 10;
  pageSizeOptions = [5, 10, 20, 50, 100];

  constructor(private wildService: ConnectorService, private excelService: ExcelService, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
    toDate: ['', Validators.required]
    })
   }

  
  onSelectCategory(opt){

    this.dateFlag = true;
    this.fromDate = "";
    this.toDate = "";
    if(opt=="Daily Count"){
      ///set default case
      this.case = "DC_ Byday";
      this.caseList = ["DC_ Byday","DC_ all", "DC_byrange"]
    }else{
      ///set default case
      this.case = "HWC_allbycases";
      this.caseList = ["HWC_allbycases", "HWC_allbyday", "HWC_casesbyrange", "HWC_dayby range","HWC_spacialbyrange"]

    }
  }

  onSelectCase(opt){
    if(opt =="DC_byrange" || opt =="HWC_casesbyrange" || opt =="HWC_dayby range" || opt =="HWC_spacialbyrange"){
      this.dateFlag = false;
    }else{
      this.dateFlag = true;
      this.fromDate = "";
      this.toDate = "";
    }
      }

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
    if(data.valid){

      this.spinnerService.show();

    /// Daily Count Report
    if(this.categoryType == "Daily Count"){
      if(this.fromDate != null && this.toDate !=null && this.case == "DC_byrange"){

        // var fday = this.fromDate.getDate();
        // var fmonthIndex = this.fromDate.getMonth();
        // var fyear = this.fromDate.getFullYear();
        // var tday = this.toDate.getDate();
        // var tmonthIndex = this.toDate.getMonth();
        // var tyear = this.toDate.getFullYear();
        // this.record = this.wildService.getDcByRange(fyear+"-"+fmonthIndex+"-"+fday, tyear+"-"+tmonthIndex+"-"+tday);
        this.record = this.wildService.getDCreportbyrange(this.fromDate.formatted, this.toDate.formatted);
      
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
      
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReport(this.dataSource.data,  'DC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      }else if(this.case == "DC_ Byday"){
        this.record = this.wildService.getDCreportbyday();
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReport(this.dataSource.data,  'DC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      }
      else if(this.case == "DC_ all"){
      
        this.record = this.wildService.getDCreportbyMonth();
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReport(this.dataSource.data,  'DC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      }
    }else{
      ///HWC Report

      if(this.case == "HWC_allbycases"){
      
        this.record = this.wildService.getHWCreport_bycases();
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReport(this.dataSource.data,  'HWC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      }else if(this.case == "HWC_allbyday"){
      
        this.record = this.wildService.getHWCreport_byday();
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReport(this.dataSource.data,  'HWC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      }
      else if(this.case == "HWC_casesbyrange"){
      
        this.record = this.wildService.getHWCreport_bycases_range(this.fromDate.formatted, this.toDate.formatted);
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReport(this.dataSource.data,  'HWC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      }  else if(this.case == "HWC_dayby range"){
      
        this.record = this.wildService.getHWCreport_byday_range(this.fromDate.formatted, this.toDate.formatted);
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReport(this.dataSource.data,  'HWC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      } else if(this.case == "HWC_spacialbyrange"){
      
        this.record = this.wildService.getHWCreport_byspacial_range(this.fromDate.formatted, this.toDate.formatted);
        this.record.subscribe(res => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
      
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          if(this.dataSource.data){
            this.excelService.exportReportSheet5(this.dataSource.data,  'HWC_Reports');
            return 'success';
          }else{
            alert("No data to export");
          }
        });
      }
    }
    }else{
    
      alert("Please select Date range");

    }
    



  }

}
