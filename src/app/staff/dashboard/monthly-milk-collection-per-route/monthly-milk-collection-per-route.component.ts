import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexLegend,
  ApexResponsive,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { takeUntil } from 'rxjs';
import { RoutesService } from 'src/app/admin/routes/routes.service';
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { UserService } from 'src/app/data/services/user.service';
import { formatDate,sum,groupBy } from 'src/app/data/services/utils';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RoutesLookUpComponent } from 'src/app/staff/sales/pages/routes-look-up/routes-look-up.component';
formatDate
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-monthly-milk-collection-per-route',
  templateUrl: './monthly-milk-collection-per-route.component.html',
  styleUrls: ['./monthly-milk-collection-per-route.component.sass']
})
export class MonthlyMilkCollectionPerRouteComponent extends BaseComponent implements OnInit {
 
  chartData: any;
  dialogData: any;
  chartParametersForm: FormGroup;
  chartOptions: Partial<ChartOptions>;
  xAxisOptions: any;
  yAxisOptions: any;
  dates = [];
  quantities = [];
  deliveredQty=[];
  isLoading: boolean = false;
  data: any[]= [];
  form: FormGroup;
  chartDispType: any = [2020, 2022, 2023, 2024, 2025];
  monthsArray: any = [
    { name: "January", value: '01' },
    { name: "February", value : '02' },
    { name: "March", value: '03'},
    { name: "April", value: '04' },
    { name: "May", value: '05' },
    { name: "June", value: '06' },
    { name: "July", value: '07' },
    { name: "August", value: '08' },
    { name: "September", value: '09' },
    { name: "October", value: '10' },
    { name: "Novembar", value: '11'  },
    { name: "December", value: '12' },
  ];
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  monthlyStr = formatDate(Date.now(),'MONTH')
  route: string = 'KIAMAINA'

  constructor(
    private service: AnalyticsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ){
    super();
  }


  ngOnInit(): void {
    this.getData()
    this.chartParametersForm = this.createChartParamtersForm()
  }
  createChartParamtersForm() {
    return this.fb.group({
      year: [this.currentYear],
      month: [this.currentMonth.value],
      route: [this.route],
    });
  }
    onSelectYear(event: any){
      const arr = this.monthlyStr.split('-')
      this.monthlyStr = `${event.value}-${arr[1]}`
      this.currentYear = event.value
      console.log(event)
      this.getData()
    }

    onSelectMonth(event: any){
      const arr = this.monthlyStr.split('-')
      this.currentMonth.value = event.value
      console.log(event.value)
      this.monthlyStr = `${arr[0]}-${event.value}`
      this.getData()
    }
    selectRoute() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.data = {
        data: "",
      };
      const dialogRef = this.dialog.open(RoutesLookUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        this.route = result.data.route
        
        this.getData()
  
      });
    }
  getData(){
   
    this.isLoading = true
    this.service.fetchCollectionsPerGivenMonthAndRoute(this.currentYear,this.currentMonth.value,this.route).subscribe(res=>{
      if(res.entity && res.entity.length>0){

        this.data  = res.entity;
      }else{
        this.data = []
      }

      this.isLoading = false
      this.renderChart()
      
    },(err)=>{
      this.isLoading = false
      this.data = []
      this.renderChart()
    })
  }
  renderChart(){
    this.quantities = []
    this.dates = []
    if(this.data.length > 0){
      this.data.forEach(item => {
        this.dates.push(item.x);
        this.quantities.push(item.y);
        this.deliveredQty.push(item.z)
      })

    }else {

      this.quantities = [];

      this.dates = [];
      this.deliveredQty = [];
    }
   
    this.chartOptions = {
      series: [
        {
          name: "Quantity Collected",
          data: this.quantities,
          type: "bar"
        },
        
        {
          name: "Qty Received",
          type: "line",
          data: this.deliveredQty,
          color: "blue",
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        foreColor: "#9aa0ac",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#177147", "#397157", "#2D7152", "#22714D"],
      stroke: {
        curve: "smooth",
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories:  this.dates,
        title: {
          text: "Day",
        },
      },
      yaxis: {
        // opposite: true,
        title: {
          text: "Quantity (Litres)",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
 
  }


