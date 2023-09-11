import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { ChartOptions, ChartSeries, XAxis } from 'ng-apexcharts';
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
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

type ChartOptions = {
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
  selector: 'app-monthly-collectios-chart',
  templateUrl: './monthly-collectios-chart.component.html',
  styleUrls: ['./monthly-collectios-chart.component.sass']
})
export class MonthlyCollectiosChartComponent extends BaseComponent implements OnInit {

  chartData: any;
  chartParametersForm: FormGroup;
  chartOptions: Partial<ChartOptions>;
  xAxisOptions: any;
  yAxisOptions: any;
  dates = [];
  quantities = [];
  isLoading: boolean = false;
  data: any[]= [];
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
  // monthlyStr = formatDate(Date.now(),'MONTH')
  year: number = new Date(Date.now()).getFullYear()
  month: number = new Date(Date.now()).getMonth()+1

  constructor(
    private service: AnalyticsService,
    private fb: FormBuilder
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
    });
  }
    onSelectYear(event: any){
      this.year = event.value
      this.getData()
    }

    onSelectMonth(event: any){
      this.month = event.value
      this.getData()
    }
  getData(){

    this.isLoading = true
    this.service.fetchCollectionsPerGivenMonth(this.year,this.month).subscribe(res=>{
      if(res.entity && res.entity.length>0){

        this.data  = res.entity;
      }else{
        this.data = []
      }
      // console.log(this.monthlyStr)

      this.isLoading = false
      this.renderChart()

    },(err)=>{
      this.isLoading = false
      this.data = []
      this.renderChart()
    })
    // return data;
  }
  renderChart(){
    // const data = this.getData()
    this.quantities = []
    this.dates = []
    if(this.data.length > 0){
      this.data.forEach(item => {
        this.dates.push(item.x);
        this.quantities.push(item.y);
      })

    }else {

      this.quantities = [];

      this.dates = [];
    }
    // console.log(this.quantities)

    this.chartOptions = {
      series: [
        {
          name: "Quantity",
          data: this.quantities,
        }
      ],
      chart: {
        height: 350,
        type: "line",
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
// console.log(this.chartOptions)
  }
}
