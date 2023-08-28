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
import { formatDate,groupBy,sum } from 'src/app/data/services/utils';
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
  monthlyStr = formatDate(Date.now(),'MONTH')

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
      const arr = this.monthlyStr.split('-')
      this.monthlyStr = `${event.value}-${arr[1]}`
      this.getData()
    }

    onSelectMonth(event: any){
      const arr = this.monthlyStr.split('-')
      this.monthlyStr = `${arr[0]}-${event.value}`
      this.getData()
    }
  formatCollections(array=[],month= formatDate(Date.now(),'MONTH')){
    if(!array.length)return []
    array = array.map(({collection_date,session,farmer_no,quantity,route,collector,id})=>{
        const d = new Date(collection_date)
        const dstr = formatDate(d,'')
        const monthly = formatDate(d,'MONTH')
        return {session,farmer_no,quantity,route,collector,id,date:dstr,monthly}
    })
    const groupedData = groupBy(array, "monthly");
    const monthly = groupedData[month];
  
    const res = monthly.map(d=>({
      x: d.date,
      y: d.quantity
    }))
    const data = groupBy(res,'x')
    const arr = []
    for (const k in data) {
      arr.push({
        x: k,
        y: sum(data[k].map(a=>a.y))
      })
    }
    return arr;
  }
  getData(){
   
    this.isLoading = true
    this.service.fetchAllCollections().subscribe(res=>{
      if(res.entity && res.entity.length>0){

        this.data  = this.formatCollections(res.entity,this.monthlyStr)
      }else{
        this.data = []
      }
      // console.log(this.monthlyStr)

      this.isLoading = false
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
