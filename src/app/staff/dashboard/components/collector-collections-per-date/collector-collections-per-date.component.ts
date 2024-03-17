import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

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
  selector: 'app-collector-collections-per-date',
  templateUrl: './collector-collections-per-date.component.html',
  styleUrls: ['./collector-collections-per-date.component.sass'],
})
export class CollectorCollectionsPerDateComponent
  extends BaseComponent
  implements OnInit
{
  public barChartOptions: Partial<ChartOptions>;
  public barChartOptions1: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  chartDispType: any = [2020, 2022, 2023, 2024, 2025];
  monthsArray: any = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'Novembar', value: 11 },
    { name: 'December', value: 12 },
  ];
  isLoading: boolean;
  chartParametersForm: FormGroup;
  quantityChartSelected: boolean = false;
  priceChartSelected: boolean = true;
  collectors: any[] = [];
  amounts: any[] = [];
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  isEmpty: boolean = false;
  quantities: any[] = [];
  quantityReceived: any[] = [];
  routes: any[] = [];

  constructor(private analyticsService: AnalyticsService, private datePipe: DatePipe, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.chartParametersForm = this.createChartParamtersForm();

    this.getCollectionPerRoute();
    // this.getCollectionsAmountAnalysisPerDate();
  }

  createChartParamtersForm() {
    return this.fb.group({
      year: [this.currentYear],
      month: [this.currentMonth.value],
    });
  }

  // onSelectChart(event: any){
  //   if(event.value == "Quantity Chart"){
  //     this.quantityChartSelected = true;
  //     this.priceChartSelected = false;

  //     this.getCollectionsQuantityAnalysisPerDate();

  //   }else if(event.value == "Price Chart"){
  //     this.quantityChartSelected = false;
  //     this.priceChartSelected =  true;

  //     this.getCollectionsAmountAnalysisPerDate()
  //   }else {
  //     this.quantityChartSelected = false;
  //     this.priceChartSelected =  false;

  //   }
  // }

  getCollectionsAmountAnalysisPerDate() {
    this.isLoading = true;

    this.collectors = [];
    this.amounts = [];
    
    let params;

    this.barChartOptions = {
      series: [
        {
          name: 'Price (KES)',
          data: this.amounts,
        },
        
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac',
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      // dataLabels: {
      //   enabled: false,
      // },
      xaxis: {
        type: 'category',
        categories: this.collectors,
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
        colors: ['#177147', '#397157', '#2D7152', '#22714D'],
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };

    params = new HttpParams()
      .set('date', this.datePipe.transform(this.chartParametersForm.value.date, "yyyy-MM-dd"))

    this.analyticsService
      .getCollectionsAnalysisPerDate(params)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {

          if(res.entity.length > 0){
            res.entity.forEach((item) => {
              this.collectors.push(item.collector);
              
              this.amounts.push(item.amount);
            });
          }else {
            this.collectors = [];
            

            this.amounts = [];
          }

          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCollectionPerRoute(){

    this.isLoading = true;

    this.quantities = [];
    this.quantityReceived = [];
    this.routes = [];
    this.amounts = []
    let params;

    this.barChartOptions = {
      series: [
        {
          name: "Quantity",
          data: this.quantities,
          type: "bar",
        },
        {
          name: 'QuantityReceived',
          data: this.quantityReceived,
          type: "line",
          color: "#FFA500"
        },
        
      ],
      chart: {
        type: "line",
        height: 350,
        foreColor: "#9aa0ac",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      // dataLabels: {
      //   enabled: false,
      // },
      xaxis: {
        type: "category",
        categories: this.routes,
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
        colors: ["#177147", "#397157", "#2D7152", "#22714D"],
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
    params = new HttpParams()
    .set('year', this.chartParametersForm.value.year)
    .set("month", this.chartParametersForm.value.month)
   
    this.analyticsService.getCollectionsPerRoute(params).pipe(takeUntil(this.subject)).subscribe(res => {
      this.isLoading = false
      if(res.entity && res.entity.length > 0){
        this.isEmpty = false
        res.entity.forEach(item => {
          this.routes.push(item.route);
  
          this.quantities.push(item.quantity);
          this.quantityReceived.push(item.quantityReceived)
  
          this.amounts.push(item.amount);
        })
      }else {
        this.quantities = [];
        this.quantityReceived =[];
        this.isEmpty = true

        this.routes = [];

        this.amounts = [];
      }



      this.isLoading = false;
    }, err => {
      console.log(err)
    })
  }
  onSelectYear(event: any){
    this.getCollectionPerRoute()
    this.currentYear = event.value;

  }
  onSelectMonth(event:any){
    this.getCollectionPerRoute()
    this.currentMonth = event.value;
  }
}
