import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { formatDate, sum, groupBy } from 'src/app/data/services/utils';
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RoutesService } from 'src/app/admin/routes/routes.service';
import { RoutesLookUpComponent } from 'src/app/staff/sales/pages/routes-look-up/routes-look-up.component';

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
  selector: 'app-milk-accumulation',
  templateUrl: './milk-accumulation.component.html',
  styleUrls: ['./milk-accumulation.component.sass']
})
export class MilkAccumulationComponent extends BaseComponent implements OnInit {
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  chartDispType: number[] = [2020, 2022, 2023, 2024, 2025];
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
  isLoading: boolean = true;
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
 
  chartParametersForm: FormGroup;
  quantityChartSelected: boolean = false;
  priceChartSelected: boolean = true;
  routes: any[] = [];
  route: any;
  data: any[];
  monthly: any;
 routeFk: number=1;
  months: any[];
  milkQuantity: any[];

  constructor(
    private analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private routeservice: RoutesService
  ) {
    super()
  }


  ngOnInit(): void {
    this.chartParametersForm = this.createChartParamtersForm();
   this.getMilkAccumulation()
    this.getAllRoutes();   
    
  }
  createChartParamtersForm() {
    return this.fb.group({
      year: [this.currentYear],
     routeFk: [this.routeFk]
    });
  }

  onSelectYear(event: any){
    this.getMilkAccumulation()
  }

  routesLookup(){
    const dialogRef = this.dialog.open(RoutesLookUpComponent, {
      width: "600px",
      data: {
        action: "Meeting Categories Lookup",
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.chartParametersForm.patchValue({
         routeFk: result.data.id,
        });

        this.getMilkAccumulation()
      },
      (err) => {
        console.log(err);
      }
    );

  }

  getAllRoutes(){
    this.route = [];
    this.routeservice
    .fetchRoutes()
    .pipe(takeUntil(this.subject))
    .subscribe(
      (res) => {
        let routes = res.entity;
        // if (!Array.isArray(routes)) {
        //   console.log('routes is not an array:', routes);
        //   return;
        // }

        routes.forEach((route) => {
            this.route.push(route);
          }
        );


        if (this.route.length > 0) {
          this.chartParametersForm.patchValue({
            route: this.route[0],
          });

          this. getMilkAccumulation();
        }else {
          this.isLoading = true
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  formatAccumulations(array, year, routeFk) {
    array = array.map(({ collectionDate, milkQuantity, routeFk, collectorId, id }) => {
      const d = new Date(collectionDate);
      const dstr = formatDate(d, '');
      const monthly = d.getMonth() + 1;
      return { collectionDate, milkQuantity, routeFk, collectorId, id, date: dstr, monthly };
    });
  
    const filteredData = array.filter(item => item.routeFk == routeFk && new Date(item.collectionDate).getFullYear()===year);
    const groupedData = groupBy(filteredData, "monthly");
    const arr = [];
    for (const month in groupedData) {
      const monthname = this.monthsArray.find(m => m.value === parseInt(month)).name; 
      const milkQuantity = groupedData[month].reduce((curr, obj) => obj.milkQuantity + curr, 0);
      arr.push({ x: monthname, y: milkQuantity });
    }
  
    return arr;
  }
  
  
  

  getMilkAccumulation(){
    this.isLoading = true;

    let milkQuantity: any[] = [];
    let months: any[] = [];
    let routeFk: any[]=[];
    let params;

    params = new HttpParams()
    .set('year', this.chartParametersForm.value.year)
    .set("routeFk", this.chartParametersForm.value.routeFk)
   
    this.analyticsService.getMilkAccumulation(params).pipe(takeUntil(this.subject)).subscribe(res => {
      if(res.entity.length > 0){
        this.data = this.formatAccumulations(res.entity, this.chartParametersForm.value.year, this.chartParametersForm.value.routeFk);

      this.data.forEach(item => {

        milkQuantity.push(item.y);

        months.push(item.x);
        // routeFk.push(item.routeFk)
      })

      }else {
        milkQuantity = [];
        months = [];
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
          categories: months,
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
