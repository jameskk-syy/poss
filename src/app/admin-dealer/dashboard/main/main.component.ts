import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { Chart } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  totalSales = 0;
  totalRevenue = 0;
  totalProducts = 0;
  totalBranches = 0;
  totalCategories = 0;

  salesData: any[] = [];
  productsData: any[] = [];
  branchesData: any[] = [];
  categoriesData: any[] = [];

  dataSource = new MatTableDataSource<any>(); // Ensure this is initialized

  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;
  @ViewChild('lineChart') lineChartRef!: ElementRef;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  navigateToCategory() {
    this.router.navigate(['/category']);
  }

  navigateToSales() {
    this.router.navigate(['/sales']);
  }

  ngOnInit(): void {
    // this.initializeDataTable();
    this.fetchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Fetch data from the backend
  fetchData() {
    this.dashboardService.getAllSales().subscribe((res) => {
      this.salesData = res;
      this.totalSales = res.length;
      this.totalRevenue = res.reduce(
        (sum, sale) => sum + (sale.totalAmount || 0),
        0
      );
      console.log('sales Data', res);
      console.log('sales  number', res.length);
      this.checkAllDataLoaded();
    });

    this.dashboardService.getAllProducts().subscribe((res) => {
      this.productsData = res;
      this.totalProducts = res.length;
      console.log('products Data', res);
      console.log('products  number', res.length);
      this.checkAllDataLoaded();
    });

    this.dashboardService.getAllBranches().subscribe((res) => {
      this.branchesData = res;
      this.totalBranches = res.length;
      console.log('branches Data', res);
      console.log('branches  number', res.length);
      this.checkAllDataLoaded();
    });

    this.dashboardService.getAllCategories().subscribe((res) => {
      this.categoriesData = res;
      this.totalCategories = res.length;
      console.log('categoriesData', res);
      console.log('categories number', res.length);
      this.checkAllDataLoaded();
    });
  }

  checkAllDataLoaded() {
    if (
      this.salesData.length &&
      this.productsData.length &&
      this.branchesData.length &&
      this.categoriesData.length
    ) {
      this.initializeCharts();
      this.dataSource.data = this.salesData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  initializeCharts(): void {
    if (!this.barChartRef || !this.pieChartRef || !this.lineChartRef) return;

    // Bar Chart: Sales per Category
    new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.categoriesData.map((c) => c.name),
        datasets: [
          {
            label: 'Sales per products',
            data: this.productsData.map(
              (c) => this.salesData.filter((s) => s.categoryId === c.id).length
            ),
            backgroundColor: 'rgba(2,117,216,1)',
          },
        ],
      },
    });

    // Pie Chart: Products per Category
    new Chart(this.pieChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: this.categoriesData.map((c) => c.name),
        datasets: [
          {
            data: this.categoriesData.map(
              (c) =>
                this.productsData.filter((p) => p.categoryId === c.id).length
            ),
            backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple'],
          },
        ],
      },
    });

    // Line Chart: Sales Over Time
    new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [...new Set(this.salesData.map((sale) => sale.date))], // Unique dates
        datasets: [
          {
            label: 'Sales Trend',
            data: [...new Set(this.salesData.map((sale) => sale.date))].map(
              (date) =>
                this.salesData
                  .filter((s) => s.date === date)
                  .reduce((sum, s) => sum + (s.totalAmount || 0), 0)
            ),
            borderColor: 'rgba(2,117,216,1)',
            backgroundColor: 'rgba(2,117,216,0.2)',
          },
        ],
      },
    });
  }

  // initializeDataTable(): void {
  //   const datatablesSimple = document.getElementById('datatablesSimple');
  //   if (datatablesSimple) {
  //     new simpleDatatables.DataTable(datatablesSimple);
  //   }
  // }
}
