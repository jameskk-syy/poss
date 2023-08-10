
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
import { formatDate, sum, groupBy } from 'src/app/data/services/utils';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ProductSaleService } from '../service/product-sale.service';
import { SalesPersonsLookupComponent } from '../../sales/pages/sales-persons-lookup/sales-persons-lookup.component';

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
  selector: 'app-salespersons-monthly-performance',
  templateUrl: './salespersons-monthly-performance.component.html',
  styleUrls: ['./salespersons-monthly-performance.component.sass']
})
export class SalespersonsMonthlyPerformanceComponent extends BaseComponent implements OnInit {
  chartParametersForm: FormGroup;
  chartOptions: Partial<ChartOptions>;
  dates: string[] = [];
  amount: number[] = [];
  isLoading: boolean = false;
  data: { x: string; y: number }[] = [];
  chartDispType: number[] = [2020, 2022, 2023, 2024, 2025];
  monthsArray: { name: string; value: string }[] = [
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
    { name: "December", value: '12' },  ];
 
    currentYear = new Date().getFullYear();
    currentMonth = this.monthsArray[new Date().getMonth()];
    monthlyStr = formatDate(Date.now(), 'yyyy-MM'); // Format as 'yyyy-MM'

    salesPersonFK: any;
  
    constructor(
      private service: ProductSaleService,
      private fb: FormBuilder,
      private dialog: MatDialog,
    ){
      super();
    }
  
    ngOnInit(): void {
      this.chartParametersForm = this.createChartParamtersForm();
      this.getData();
    }
  
    createChartParamtersForm(): FormGroup {
      return this.fb.group({
        year: [this.currentYear],
        month: [this.currentMonth.value],
        salesperson: [this.salesPersonFK],
      });
    }
    onSelectYear(event: any) {
      const arr = this.monthlyStr.split('-');
      this.monthlyStr = `${event.value}-${arr[1]}`;
      this.getData();
    }
  
    onSelectMonth(event: any) {
      const arr = this.monthlyStr.split('-');
      this.monthlyStr = `${arr[0]}-${event.value}`;
      this.getData();
    }
  
    OnSelectSalesPerson() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.data = {
        data: "",
      };
      const dialogRef = this.dialog.open(SalesPersonsLookupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
        this.salesPersonFK = result.data.salesPersonFk;
        this.getData();
      });
    }
    formatSales(array = [], year, month, salesPersonFk) {
      if (!array.length) return [];
    
      array = array.map(({ createdOn, amount, quantity }) => {
        const d = new Date(createdOn);
        const dstr = formatDate(d, '');
        const monthly = formatDate(d, 'MM-yyyy');
        return { createdOn, amount, quantity, date: dstr, monthly };
      });
    
      const daysInMonth = new Date(year, month, 0).getDate();
    
      array = array.filter(item => {
        const itemYear = new Date(item.createdOn).getFullYear();
        const itemMonth = new Date(item.createdOn).getMonth() + 1; 
        const itemDay = new Date(item.createdOn).getDate();
        return itemYear === year && itemMonth === month && itemDay <= daysInMonth && item.salesPersonFk === salesPersonFk;
      });
    
      const groupedData = groupBy(array, "date");
      const arr = [];
    
      for (const date in groupedData) {
        const amount = groupedData[date].reduce((total, obj) => total + obj.amount, 0);
        arr.push({ x: date, y: amount });
      }
    
      return arr;
    }
 
    getData() {
    
      this.service.fetchAllSalesBySalesPersonFk(this.salesPersonFK).pipe(takeUntil(this.subject)).subscribe(res => {
        // console.log(res);
        if (res.entity && res.entity.length > 0) {
          this.data = this.formatSales(res.entity, this.chartParametersForm.get('year').value, +this.chartParametersForm.get('month').value, this.salesPersonFK);
        } else {
          this.data = [];
        }    
        this.isLoading = false;
        this.renderChart();
      });
    }
    
    
    
  
    renderChart() {
      this.amount = [];
      this.dates = [];
    
      if (this.data.length > 0) {
        this.data.forEach(item => {
          this.dates.push(item.x);
          this.amount.push(item.y);
        });
      }
      
      this.chartOptions = {
        series: [
          {
            // type: 'timeseries',
            name: 'Amount',
            data: this.amount,
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
          colors: ["transparent", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories:  this.dates,
        type: 'datetime',
        title: {
          text: "Day",
        },
      },
      yaxis: {
        // opposite: true,
        title: {
          text: "Amount (KES)",
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
    };  }
}
