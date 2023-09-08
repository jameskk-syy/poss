import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
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
  selector: 'app-daily-milk-collection',
  templateUrl: './daily-milk-collection.component.html',
  styleUrls: ['./daily-milk-collection.component.sass']
})
export class DailyMilkCollectionComponent extends BaseComponent implements OnInit {
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;
  datesArray: string[] = [];

  chartDispType: any = [2020, 2022, 2023, 2024, 2025];
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
    { name: "Novembar", value: 11  },
    { name: "December", value: 12 },
  ];

  isLoading: boolean;
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  currentDate = this.datesArray[new Date().getDate()];
  quantities = []
  routes = []

  
  chartParametersForm: FormGroup;
  selectedDate: string='';

  constructor(
    private analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.chartParametersForm = this.createChartParamtersForm();
    this.selectedDate = this.chartParametersForm.value.date 
    // this.chartParametersForm.controls['date'].setValue(new Date().toISOString().slice(0, 10));

    this.generateDatesArray(); 
    this.fetchAllCollections();

  }
 
 
  createChartParamtersForm() {
    const currentDate = new Date().toISOString().slice(0, 10); 
    return this.fb.group({
      date: [currentDate], 
    //  routeId: ["2"]
    });
  }

  onSelectDate(): void {
    this.selectedDate = formatDate(this.chartParametersForm.value.date,'')
    this.fetchAllCollections();
  }
  generateDatesArray(): void {
    const selectedDate = new Date(this.chartParametersForm.value.date);

    if (!isNaN(selectedDate.getTime())) {
      this.datesArray = [formatDate(selectedDate,'')];
    } else {
      this.datesArray = [];
    }
  }
  formatCollections(array,date= formatDate(Date.now(),'')){
    array = array.map(({collection_date,session,farmer_no,quantity,route,collector,id})=>{
        const d = new Date(collection_date)
        const dstr = formatDate(d,'')
        const monthly = formatDate(d,'MONTH')
        return {session,farmer_no,quantity,route,collector,id,date:dstr,monthly}
    })
    const groupedData = groupBy(array, "route");
    const arr = []
    for (const x in groupedData) {
      const y = groupedData[x].filter(dt=>dt.date==date).reduce((curr,obj)=> obj.quantity+curr,0)
      arr.push({x,y})
    }
    return arr;
  }
        
 
  fetchAllCollections(){
    this.isLoading = true;
    

    this.quantities = [];
    this.routes= [];
    // let amounts: any[] = []
    let params;

    params = new HttpParams()
    .set('year', this.chartParametersForm.value.year)
    .set("month", this.chartParametersForm.value.month)
    .set("date", this.chartParametersForm.value.date)
    .set("routeId", this.chartParametersForm.value.routeId)
    this.analyticsService.fetchRouteGroupedCollectionPerGivenDay(this.selectedDate).subscribe(res => {
      const data = res.entity
      
      this.renderChart(data)

      this.isLoading = false;
    }, err => {
      this.renderChart([])
      this.isLoading = false
    })
  }
  onDateChange(event:any){

  }
  renderChart(data){

    if(data.length > 0){
      data.forEach(item => {
        this.routes.push(item.x);

        this.quantities.push(item.y);

        // amounts.push(item.amount);
      })
    }else {
      this.quantities = [];

      this.routes = [];

      // amounts = [];
    }


    this.barChartOptions = {
      series: [
        {
          name: "Quantity",
          data: this.quantities, 
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
        categories: this.routes,
        title: {
          text: "Routes",
        },
        
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
  }
}
  
  
