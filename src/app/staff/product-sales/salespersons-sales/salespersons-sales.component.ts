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
import { HttpClient } from 'selenium-webdriver/http';
import { ProductSaleService } from '../service/product-sale.service';
import { UserService } from 'src/app/data/services/user.service';
import { formatDate,groupBy,sum } from 'src/app/data/services/utils';

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
  selector: 'app-salespersons-sales',
  templateUrl: './salespersons-sales.component.html',
  styleUrls: ['./salespersons-sales.component.sass']
})
export class SalespersonsSalesComponent extends BaseComponent implements OnInit {
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

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
  // monthlyStr = formatDate(Date.now(),'MONTH')
  chartParametersForm: FormGroup;
  salesperson: any[];
  amount: any[];

  constructor(
    private service:ProductSaleService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService
  ) { 
    super()
  }

  ngOnInit(): void {
    this.chartParametersForm=this.createChartParametersForm();
    this.getSalesPersonsSalesPerMonth();
  }
  onSelectYear(event: any){
    this.getSalesPersonsSalesPerMonth()
  }

  onSelectMonth(event: any){
    this.getSalesPersonsSalesPerMonth()
  }

  createChartParametersForm(): FormGroup {
    return this.fb.group({
      year: [this.currentYear],
      month: [this.currentMonth.value],
      salesPersonFk: ["2"]
    });
  }
  formatSales(array = [], year, month) {
    if (!array.length) return [];
  
    array = array.map(({ createdOn, routeFk, routeName, amount, quantity, salesPersonName, salesPersonFk }) => {
      const d = new Date(createdOn);
      const dstr = formatDate(d, ''); // Assuming formatDate function is defined elsewhere
      return { createdOn, routeFk, routeName, amount, quantity, salesPersonName, salesPersonFk, date: dstr };
    });
  
    const filteredData = array.filter(item => {
      const itemYear = new Date(item.createdOn).getFullYear();
      const itemMonth = new Date(item.createdOn).getMonth() + 1; // Months are 0-based
      return itemYear === year && itemMonth === month;
    });
  
    const groupedData = groupBy(filteredData, "salesPersonName");
    const arr = [];
  
    for (const salesPersonName in groupedData) {
      const totalAmount = groupedData[salesPersonName].reduce((total, obj) => total + obj.amount, 0);
      arr.push({ x: salesPersonName, y: totalAmount });
    }
  
    return arr;
  }
  getSalesPersonsSalesPerMonth() {
    this.isLoading = true;
  
    this.salesperson= [];
    this.amount= [];
    let params;
  
    params = new HttpParams()
      .set('year', this.chartParametersForm.value.year)
      .set("month", this.chartParametersForm.value.month)
      .set("date", this.chartParametersForm.value.date)
      .set("salesPersonFk", this.chartParametersForm.value.salesPersonFk);
  
    this.service.fetchAllSales(params).pipe(takeUntil(this.subject)).subscribe(res => {
      const salesData = res.entity;
      const year = this.chartParametersForm.value.year;
      const month = this.chartParametersForm.value.month;
      const data = this.formatSales(salesData, year, month);
  
      if (data.length > 0) {
        data.forEach(item => {
          this.salesperson.push(item.x);
          this.amount.push(item.y);
        });
      } else {
        this.salesperson = [];
        this.amount = [];
      }
      this.barChartOptions = {
        series: [
          {
            name: "Amount",
            data: this.amount,
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
          categories: this.salesperson,
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
