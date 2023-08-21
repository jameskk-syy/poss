import {  HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {formatDate,sum,groupBy} from 'src/app/data/services/utils'

import { MatDialog } from '@angular/material/dialog';
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
import { Options } from 'selenium-webdriver';
import { HttpClient } from 'selenium-webdriver/http';
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { UserService } from 'src/app/data/services/user.service';
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
  selector: 'app-collectors-totals-per-month',
  templateUrl: './collectors-totals-per-month.component.html',
  styleUrls: ['./collectors-totals-per-month.component.sass']
})
export class CollectorsTotalsPerMonthComponent extends BaseComponent implements OnInit {
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  chartDispType: any = [2020, 2021, 2022, 2023, 2024, 2025];
  monthsArray: any = [
    { name: "January", value: 1 },
    { name: "February", value : 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11  },
    { name: "December", value: 12 },
  ];
  isLoading: boolean;
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  chartParametersForm: FormGroup;
  monthly: any;

  constructor(private analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    super()
  }

  ngOnInit(): void {
    this.chartParametersForm = this.createChartParametersForm();
    this.barChartOptions={}
    this.getCollectorsTotalsPerMonth();
  }
  
  
  createChartParametersForm() {
  return this.fb.group({
  year: [this.currentYear],
  month: [this.currentMonth.value],
  collectorId: ['']
}
)  }
onSelectYear(event: any){
  this.getCollectorsTotalsPerMonth()
}

onSelectMonth(event: any){
  this.getCollectorsTotalsPerMonth()
}
formatDate(array, date = formatDate(Date.now(), '')) {
  array = array.map(({ collectionDate, collectorId, milkQuantity }) => {
    const d = new Date(collectionDate);
    const dstr = formatDate(d, 'MMM yyyy'); 
    const monthly = formatDate(d, 'yyyy-MM'); 
        return { collectorId, milkQuantity, date: dstr, monthly };
  });
  const groupedData = groupBy(array, "date");
  const arr = []
  for (const x in groupedData) {
    const y = groupedData[x].filter(dt => dt.date == date).reduce((curr, obj) => obj.milkQuantity + curr, 0)
    arr.push({x,y})
  }
  return arr;
}
  getCollectorsTotalsPerMonth() {
    this.isLoading = true;

    let milkQuantity: any[] = [];
    let collectorId: any[] = [];
    let params;

    params = new HttpParams()
    .set('year', this.chartParametersForm.value.year)
    .set("month", this.chartParametersForm.value.month)
    .set("collectorId", this.chartParametersForm.value.collectorId)
   
    this.analyticsService.getCollectorsTotalsPerMonth(params).pipe(takeUntil(this.subject)).subscribe(res => {

      const data = this.formatDate(res.entity,this.monthly)

      if(data.length > 0){
        data.forEach(item => {
          collectorId.push(item.collector);
  
          milkQuantity.push(item.milkQuantity);
  
        })
      }else {
        milkQuantity = [];

        collectorId = [];

      }


      this.barChartOptions = {
        series: [
          {
            name: "Quantity",
            data: milkQuantity,
          },
          
        ],
        chart: {
          type: "bar",
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
          categories: collectorId,
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

      this.isLoading = false;
    }, err => {
      console.log(err)
      this.isLoading = false
    })
  }


  

}
