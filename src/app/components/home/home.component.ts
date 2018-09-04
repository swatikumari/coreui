import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import {IMyDpOptions, IMyDate} from 'mydatepicker';
import { ConnectorService } from '../../services/connector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public toDate;
  public fromDate;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};



  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private wildService: ConnectorService) {
    let d: Date = new Date();
    console.log(d);
        this.toDate = {date: {year: d.getFullYear(),
                             month: d.getMonth() + 1,
                             day: d.getDate()},
                            formatted:d.getFullYear()+"-"+('0' + (d.getMonth() + 1)).slice(-2)+"-"+('0' + (d.getDate())).slice(-2)};
        this.fromDate = {date: {year: d.getFullYear(),
                              month: d.getMonth(),
                              day: d.getDate()},
                            formatted: d.getFullYear()+"-"+('0' + (d.getMonth())).slice(-2)+"-"+('0' + (d.getDate())).slice(-2)};
  }

  ngOnInit() {
    this.barGraph();
    this.lineGraph(this.fromDate, this.toDate);
  this.lineGraph2(this.fromDate, this.toDate);
  this.lineGraph3(this.fromDate,this.toDate);
  this.lineGraph4(this.fromDate,this.toDate);
  this.getTable1();
}



  // lineChart
  // public lineChartData: Array<any> = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'BP'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'NH'}
  // ];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: any = {
  //   animation: false,
  //   responsive: true
  // };
  // public lineChartColours: Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   }
  // ];
  // public lineChartLegend = true;
  // public lineChartType = 'line';

  onSubmit(fromdate, todate) {
    if (!fromdate || !todate) {
      alert("Please fill date fields.")
    }
    this.lineGraph(fromdate, todate);
    this.lineGraph2(fromdate,todate);
    this.lineGraph3(fromdate,todate);
    this.lineGraph4(fromdate,todate);
  }

  dataSet: any;
  lineChart = [];
  barChart = [];
  record: any;
//  fromDate: any;
 // toDate: any;

  lineGraph(fromdate, todate) {
  this.fromDate = fromdate;
  this.toDate = todate;
   this.record =  this.wildService.getBpNhByRange(this.fromDate.formatted, this.toDate.formatted);
  this.record.subscribe(res => {
    this.dataSet = res.data;
    const date = [];
   const nh_case = [];
   const bp_case = [];
   this.dataSet.forEach(element => {
    console.log(element);
     date.push(element.CASE_DATE);
     nh_case.push(element.NH_CASES);
     bp_case.push(element.BP_CASE);
   });
    date;
    nh_case;
    bp_case;


     this.lineChart = new Chart('canvas', {
       type: 'line',
       data: {
         labels: date,
         datasets: [
           {
             data: nh_case,
             borderColor: '#3cba9f',
             label: 'NH_CASES',
             file: false
           },
           {
            data: bp_case,
            borderColor: '#ffcc00',
            label: 'BP_CASES',
            file: false
          }
         ]
       },
       options: {
         title: {
           text: 'HWC',
           display: true
         },
         scales: {
           xAxes: [{
             display: true
           }],
           yAxes: [{
             display: true
           }]
         }
       }
     });

    });
   }


   lineGraph2(fromdate, todate) {
    this.fromDate = fromdate;
    this.toDate = todate;
     this.record =  this.wildService.getBpNhByCategory(this.fromDate.formatted, this.toDate.formatted);
    this.record.subscribe(res => {
      this.dataSet = res.data;
       const dateArr = [ ];
      const crpd_cases = [];
    // const bp_case = [];
    // const pd_dates = [];

     const pd_cases = [];

    // // const lp_dates = [];
     const lp_cases = [];

    // // const cr_dates = [];
     const cr_cases = [];

    // // const hi_dates = [];
     const hi_cases = [];

    this.dataSet.forEach(element => {
      if(!dateArr.includes(element.CASE_DATE)){
        dateArr.push(element.CASE_DATE);
      }

    });
dateArr;
    for(let i = 0; i<dateArr.length;i++){
      this.dataSet.forEach(element => {
        if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "CRPD"){
          crpd_cases.push(element.TOTAL_BP_NH_CASES)
        }
        else {
          crpd_cases.push(0);
        }
        crpd_cases;
        if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "PD"){
          pd_cases.push(element.TOTAL_BP_NH_CASES)
        }
        else {
          pd_cases.push(0);
        }
        pd_cases;
        if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "LP"){
          lp_cases.push(element.TOTAL_BP_NH_CASES)
        }
        else {
          lp_cases.push(0);
        }
        if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "CR"){
          cr_cases.push(element.TOTAL_BP_NH_CASES)
        }
        else {
          cr_cases.push(0);
        }
        if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "HI"){
          hi_cases.push(element.TOTAL_BP_NH_CASES)
        }
        else {
          hi_cases.push(0);
        }
      });
    }

    // this.dataSet.forEach(element => {
    // //    date.push(element.CASE_DATE);
    // //    nh_case.push(element.NH_CASES);
    // //    bp_case.push(element.BP_CASE);
    // //
    // date.push(element.CASE_DATE);
    //  if (element.CATEGORY === "CRPD") {
    //   crpd_cases.push(element.TOTAL_BP_NH_CASES);
    //  } else if(element.CATEGORY === "PD"){
    //   pd_cases.push(element.TOTAL_BP_NH_CASES);
    //  } else if(element.CATEGORY === "LP"){
    //   lp_cases.push(element.TOTAL_BP_NH_CASES);
    // } else if(element.CATEGORY === "CR"){
    //   cr_cases.push(element.TOTAL_BP_NH_CASES);
    // } else{
    //   hi_cases.push(element.TOTAL_BP_NH_CASES);
    // }

  // });
      // date;
      // nh_case;
      // bp_case;

       this.lineChart = new Chart('can', {
         type: 'line',
         data: {
           labels: dateArr,
           datasets: [
             {
               data: crpd_cases,
               "borderColor":"rgb(0, 0, 255)",
               label: 'CRPD_CASES',
               file: false,
               "fill" : false,
             },
             {
              data: pd_cases,
              borderColor: '#ffcc00',
              label: 'PD_CASES',
              file: false,
              "fill" : false,
            },
            {
              data: lp_cases,
              "borderColor":"rgb(75, 192, 192)",
              label: 'LP_CASES',
              file: false,
              "fill" : false,
            },
            {
              data: cr_cases,
              "borderColor":"rgb(175, 92, 92)",
              label: 'CR_CASES',
              file: false,
              "fill" : false,
            },
            {
              data: hi_cases,
              "borderColor":"rgb(5, 12, 52)",
              label: 'HI_CASES',
              file: false,
              "fill" : false,
            },

           ]
         },
         options: {
           title: {
             text: 'HWC',
             display: true
           },
           scales: {
             xAxes: [{
               display: true
             }],
             yAxes: [{
               display: true
             }]
           }
         }
       });

      });
    }


    lineGraph3(fromdate, todate) {
      this.fromDate = fromdate;
      this.toDate = todate;
       this.record =  this.wildService.getBpByCategory(this.fromDate.formatted, this.toDate.formatted);
      this.record.subscribe(res => {
        this.dataSet = res.data;
         const dateArr = [ ];
        const crpd_cases = [];
      // const bp_case = [];
      // const pd_dates = [];

       const pd_cases = [];

      // // const lp_dates = [];
       const lp_cases = [];

      // // const cr_dates = [];
       const cr_cases = [];

      // // const hi_dates = [];
       const hi_cases = [];

      this.dataSet.forEach(element => {
        if(!dateArr.includes(element.CASE_DATE)){
          dateArr.push(element.CASE_DATE);
        }

      });

      for(let i = 0; i<dateArr.length;i++){
        this.dataSet.forEach(element => {
          if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "CRPD"){
            crpd_cases.push(element.BP_CASES)
          }
          else {
            crpd_cases.push(0);
          }
          crpd_cases;
          if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "PD"){
            pd_cases.push(element.BP_CASES)
          }
          else {
            pd_cases.push(0);
          }
          pd_cases;
          if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "LP"){
            lp_cases.push(element.BP_CASES)
          }
          else {
            lp_cases.push(0);
          }
          if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "CR"){
            cr_cases.push(element.BP_CASES)
          }
          else {
            cr_cases.push(0);
          }
          if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "HI"){
            hi_cases.push(element.BP_CASES)
          }
          else {
            hi_cases.push(0);
          }
        });
      }

      // this.dataSet.forEach(element => {
      // //    date.push(element.CASE_DATE);
      // //    nh_case.push(element.NH_CASES);
      // //    bp_case.push(element.BP_CASE);
      // //
      // date.push(element.CASE_DATE);
      //  if (element.CATEGORY === "CRPD") {
      //   crpd_cases.push(element.TOTAL_BP_NH_CASES);
      //  } else if(element.CATEGORY === "PD"){
      //   pd_cases.push(element.TOTAL_BP_NH_CASES);
      //  } else if(element.CATEGORY === "LP"){
      //   lp_cases.push(element.TOTAL_BP_NH_CASES);
      // } else if(element.CATEGORY === "CR"){
      //   cr_cases.push(element.TOTAL_BP_NH_CASES);
      // } else{
      //   hi_cases.push(element.TOTAL_BP_NH_CASES);
      // }

    // });
        // date;
        // nh_case;
        // bp_case;

         this.lineChart = new Chart('bp', {
           type: 'line',
           data: {
             labels: dateArr,
             datasets: [
               {
                 data: crpd_cases,
                 "borderColor":"rgb(0, 0, 255)",
                 label: 'CRPD_CASES',
                 file: false,
                 "fill" : false,
               },
               {
                data: pd_cases,
                borderColor: '#ffcc00',
                label: 'PD_CASES',
                file: false,
                "fill" : false,
              },
              {
                data: lp_cases,
                "borderColor":"rgb(75, 192, 192)",
                label: 'LP_CASES',
                file: false,
                "fill" : false,
              },
              {
                data: cr_cases,
                "borderColor":"rgb(175, 92, 92)",
                label: 'CR_CASES',
                file: false,
                "fill" : false,
              },
              {
                data: hi_cases,
                "borderColor":"rgb(5, 12, 52)",
                label: 'HI_CASES',
                file: false,
                "fill" : false,
              },

             ]
           },
           options: {
             title: {
               text: 'HWC',
               display: true
             },
             scales: {
               xAxes: [{
                 display: true
               }],
               yAxes: [{
                 display: true
               }]
             }
           }
         });

        });
      }

      lineGraph4(fromdate, todate) {
        this.fromDate = fromdate;
        this.toDate = todate;
         this.record =  this.wildService.getNhByCategory(this.fromDate.formatted, this.toDate.formatted);
        this.record.subscribe(res => {
          this.dataSet = res.data;
           const dateArr = [ ];
          const crpd_cases = [];
        // const bp_case = [];
        // const pd_dates = [];

         const pd_cases = [];

        // // const lp_dates = [];
         const lp_cases = [];

        // // const cr_dates = [];
         const cr_cases = [];

        // // const hi_dates = [];
         const hi_cases = [];

        this.dataSet.forEach(element => {
          if(!dateArr.includes(element.CASE_DATE)){
            dateArr.push(element.CASE_DATE);
          }

        });

        for(let i = 0; i<dateArr.length;i++){
          this.dataSet.forEach(element => {
            if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "CRPD"){
              crpd_cases.push(element.NH_CASES)
            }
            else {
              crpd_cases.push(0);
            }
            crpd_cases;
            if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "PD"){
              pd_cases.push(element.NH_CASES)
            }
            else {
              pd_cases.push(0);
            }
            pd_cases;
            if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "LP"){
              lp_cases.push(element.NH_CASES)
            }
            else {
              lp_cases.push(0);
            }
            if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "CR"){
              cr_cases.push(element.NH_CASES)
            }
            else {
              cr_cases.push(0);
            }
            if(dateArr[i] === element.CASE_DATE && element.CATEGORY === "HI"){
              hi_cases.push(element.NH_CASES)
            }
            else {
              hi_cases.push(0);
            }
          });
        }

        // this.dataSet.forEach(element => {
        // //    date.push(element.CASE_DATE);
        // //    nh_case.push(element.NH_CASES);
        // //    bp_case.push(element.BP_CASE);
        // //
        // date.push(element.CASE_DATE);
        //  if (element.CATEGORY === "CRPD") {
        //   crpd_cases.push(element.TOTAL_BP_NH_CASES);
        //  } else if(element.CATEGORY === "PD"){
        //   pd_cases.push(element.TOTAL_BP_NH_CASES);
        //  } else if(element.CATEGORY === "LP"){
        //   lp_cases.push(element.TOTAL_BP_NH_CASES);
        // } else if(element.CATEGORY === "CR"){
        //   cr_cases.push(element.TOTAL_BP_NH_CASES);
        // } else{
        //   hi_cases.push(element.TOTAL_BP_NH_CASES);
        // }

      // });
          // date;
          // nh_case;
          // bp_case;

           this.lineChart = new Chart('nh', {
             type: 'line',
             data: {
               labels: dateArr,
               datasets: [
                 {
                   data: crpd_cases,
                   "borderColor":"rgb(0, 0, 255)",
                   label: 'CRPD_CASES',
                   file: false,
                   "fill" : false,
                 },
                 {
                  data: pd_cases,
                  borderColor: '#ffcc00',
                  label: 'PD_CASES',
                  file: false,
                  "fill" : false,
                },
                {
                  data: lp_cases,
                  "borderColor":"rgb(75, 192, 192)",
                  label: 'LP_CASES',
                  file: false,
                  "fill" : false,
                },
                {
                  data: cr_cases,
                  "borderColor":"rgb(175, 92, 92)",
                  label: 'CR_CASES',
                  file: false,
                  "fill" : false,
                },
                {
                  data: hi_cases,
                  "borderColor":"rgb(5, 12, 52)",
                  label: 'HI_CASES',
                  file: false,
                  "fill" : false,
                },

               ]
             },
             options: {
               title: {
                 text: 'HWC',
                 display: true
               },
               scales: {
                 xAxes: [{
                   display: true
                 }],
                 yAxes: [{
                   display: true
                 }]
               }
             }
           });

          });
        }



// bar chart

 barGraph() {

  const date = ["2018-08-27T18:30:00.000Z"];
  const nh_case = ["43"];
  const bp_case = ["23"];

//  this.record = this.wildService.getPreviousBpNhCount();

  //  this.record.subscribe(res => {
  //   this.dataSet = res.data;
  //   //   const date = [];
    //  const nh_case = [];
    //  const bp_case = [];
    //  this.dataSet.forEach(element => {
    //    date.push(element.CASE_DATE);
    //    nh_case.push(element.NH_CASES);
    //    bp_case.push(element.BP_CASE);
    //  });
  this.barChart = new Chart('ctx', {
    type: 'bar',
    data:{
      labels: date,
      datasets: [
        {
          data: nh_case,
          borderColor: "rgba(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          "borderWidth":1,
          label: 'NH_CASES',
          file: false
        },
        {
         data: bp_case,
         borderColor: "rgba(0,0,255)",
         backgroundColor: "rgba(0,0,255,0.2)",
         "borderWidth":1,
         label: 'BP_CASES',
         file: false
       }
      ]
    },

    options: {
      title: {
        text: 'DC Count(Prev)',
        display: true
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }]
      }
    }
  });

}//);




 //}

// Pie
 public pieChartLabels: string[] = ['HWC1', 'HWC2', 'HWC3'];
 public pieChartData: number[] = [300, 500, 100];
 public pieChartType = 'pie';

 displayedCol = [];
 displayedRows = [];

dataSource: any;
@ViewChild(MatPaginator) paginator: MatPaginator;
totalPost = 10;
postPerPage = 10;
pageSizeOptions = [5, 10, 20, 50, 100];

getTable1(){
  this.record = this.wildService.getBpNhYearly();
  this.record.subscribe(res => {
    // if (!res) {
    //   this.spinnerService.hide();
    //   return;
    // }

     this.dataSource = res.data as string[];
    for (let key in res.data[0]){
      this.displayedCol.push(key);

    }

  });

}

markers: any = [
  {
    name: 'Bandipura',
    lat: 11.7584,
    lng: 76.4454,
  },
  {
    name: 'Nagarahole',
    lat: 12.0314,
    lng: 76.1207,
  },
  {
    name: 'Mysuru',
    lat: 12.2958,
    lng: 76.6394
  },
  // {
  //   name: 'Aralikatte',
  //   lat: 12.9618738900,
  //   lng: 77.6017209600
  // },
  // {
  //   name: 'Anjanapura',
  //   lat: 12.9617556600,
  //   lng: 77.6016538500
  // },
  // {
  //   name: 'Kolavige',
  //   lat: 12.9622243900,
  //   lng: 77.6019761100
  // },
  // {
  //   name: 'Alanahalli',
  //   lat: 12.9746639400,
  //   lng: 77.6162845200
  // },
  // {
  //   name: 'Achattipura',
  //   lat: 12.9617345400,
  //   lng: 77.6018864000
  // },
  // {
  //   name: 'Kalanahundi',
  //   lat: 12.9617961500,
  //   lng: 77.6016707600
  // },

]

mapClicked(event) {
  console.log(event);
}

clickedMarker(m, i) {

}

}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {

//   title: string = 'My first AGM project';
//   lat: number = 15.3173;
//   lng: number = 75.7139;
//   markers =[{"latitude":12.0314,"longitude":76.1207},{"latitude":11.7584,"longitude":76.4454},{"latitude":12.0071,"longitude":76.3898} ]
//   constructor() { }

//   ngOnInit() {
//   }
//   // lineChart
//   public lineChartData: Array<any> = [
//     {data: [65, 59, 80, 81, 56, 55, 40], label: 'BP'},
//     {data: [28, 48, 40, 19, 86, 27, 90], label: 'NH'}
//   ];
//   public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//   public lineChartOptions: any = {
//     animation: false,
//     responsive: true
//   };
//   public lineChartColours: Array<any> = [
//     { // grey
//       backgroundColor: 'rgba(148,159,177,0.2)',
//       borderColor: 'rgba(148,159,177,1)',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//     },
//     { // dark grey
//       backgroundColor: 'rgba(77,83,96,0.2)',
//       borderColor: 'rgba(77,83,96,1)',
//       pointBackgroundColor: 'rgba(77,83,96,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(77,83,96,1)'
//     }
//   ];
//   public lineChartLegend = true;
//   public lineChartType = 'line';
// // barChart
// public barChartOptions: any = {
//   scaleShowVerticalLines: false,
//   responsive: true
// };
// public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
// public barChartType = 'bar';
// public barChartLegend = true;

// public barChartData: any[] = [
//   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
//   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
// ];

//  // Pie
//  public pieChartLabels: string[] = ['HWC1', 'HWC2', 'HWC3'];
//  public pieChartData: number[] = [300, 500, 100];
//  public pieChartType = 'pie';
// }

