import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef;
  @ViewChild('stackedBarChart') stackedBarChartRef!: ElementRef;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  barChart: any; // Declare chart properties
  pieChart: any;
  lineChart: any;
  doughnutChart: any;
  stackedBarChart: any;

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
    this.fetchData();
    console.log('Data Source:', this.dataSource);
    console.log('data fetched:', this.salesData);

    Chart.register(...registerables); // Register necessary components
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Fetch data from the backend using forkJoin
  fetchData() {
    forkJoin({
      sales: this.dashboardService.getAllSales(),
      products: this.dashboardService.getAllProducts(),
      branches: this.dashboardService.getAllBranches(),
      categories: this.dashboardService.getAllCategories(),
    }).subscribe(
      ({ sales, products, branches, categories }) => {
        // If response structure has a `data` key, adjust accordingly
        this.salesData = sales.data ?? sales;
        this.productsData = products.data ?? products;
        this.branchesData = branches.data ?? branches;
        this.categoriesData = categories.data ?? categories;

        // Check if arrays are properly received
        console.log('Categories:', this.categoriesData);
        console.log('Branches:', this.branchesData);

        this.totalSales = this.salesData.length;
        this.totalRevenue = this.salesData.reduce(
          (sum, sale) => sum + (sale.totalAmount || 0),
          0
        );
        this.totalProducts = this.productsData.length;
        this.totalBranches = Array.isArray(this.branchesData)
          ? this.branchesData.length
          : 0;
        console.log('Total Branches:', this.totalBranches); // ✅ Confirm the value

        this.totalCategories = Array.isArray(this.categoriesData)
          ? this.categoriesData.length
          : 0;

        this.dataSource.data = this.salesData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        if (this.barChart) {
          this.barChart.destroy();
        }
        this.initializeCharts();
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

  initializeCharts(): void {
    setTimeout(() => {
      if (
        !this.barChartRef ||
        !this.pieChartRef
        // !this.lineChartRef ||
        // !this.doughnutChartRef ||
        // !this.stackedBarChartRef
      )
        return;

      // 1️⃣ Bar Chart - Sales per Branch
      // this.barChart = new Chart(this.barChartRef.nativeElement, {
      //   type: 'bar',
      //   data: {
      //     labels: this.branchesData.map((b) => b.name),
      //     datasets: [
      //       {
      //         label: 'Sales Count per Branch',
      //         data: this.branchesData.map(
      //           (b) => this.salesData.filter((s) => s.branchId === b.id).length
      //         ),
      //         backgroundColor: 'rgba(54, 162, 235, 0.7)',
      //         borderColor: 'rgba(54, 162, 235, 1)',
      //         borderWidth: 1,
      //       },
      //     ],
      //   },
      //   options: {
      //     responsive: true,
      //     scales: {
      //       y: {
      //         beginAtZero: true,
      //         title: { display: true, text: 'Number of Sales' },
      //       },
      //     },
      //   },
      // });

      const barCanvas = document.getElementById(
        'barChart'
      ) as HTMLCanvasElement;
      const barData = {
        labels: ['Sales', 'Products', 'Branches', 'Categories'],
        datasets: [
          {
            label: 'Total Count',
            data: [
              this.totalSales,
              this.totalProducts,
              this.totalBranches,
              this.totalCategories,
            ],
            backgroundColor: ['red', 'blue', 'green', 'orange'],
          },
        ],
      };

      this.barChart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: barData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true, // ✅ Ensures Y-axis starts from 0
            },
          },
        },
      });

      // pie chart
      const pieCanvas = document.getElementById(
        'pieChart'
      ) as HTMLCanvasElement;

      const pieData = {
        labels: ['Sales', 'Products', 'Branches', 'Categories'],
        datasets: [
          {
            label: 'Total Count',
            data: [
              this.totalSales,
              this.totalProducts,
              this.totalBranches,
              this.totalCategories,
            ],
            backgroundColor: ['red', 'blue', 'green', 'orange'],
          },
        ],
      };

      this.pieChart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: pieData,
        options: {
          responsive: true,
        },
      });

      // const lineCanvas = document.getElementById(
      //   'lineChart'
      // ) as HTMLCanvasElement;

      // const lineData = {
      //   labels: ['Sales', 'Products', 'Branches', 'Categories'],
      //   datasets: [
      //     {
      //       label: 'Total Count',
      //       data: [
      //         this.totalSales,
      //         this.totalProducts,
      //         this.totalBranches,
      //         this.totalCategories,
      //       ],
      //       borderColor: 'blue',
      //       backgroundColor: 'rgba(0, 0, 255, 0.2)',
      //       borderWidth: 2,
      //       fill: true, // ✅ Fills area under the line
      //     },
      //   ],
      // };

      // this.lineChart = new Chart(this.lineChartRef.nativeElement, {
      //   type: 'line',
      //   data: lineData,
      //   options: {
      //     responsive: true,
      //     scales: {
      //       y: {
      //         beginAtZero: true,
      //       },
      //     },
      //   },
      // });

      //   // 4️⃣ Doughnut Chart - Top-Selling Products
      // if (this.doughnutChartRef) {
      //   this.doughnutChart = new Chart(this.doughnutChartRef.nativeElement, {
      //     type: 'doughnut',
      //     data: {
      //       labels: this.productsData
      //         .sort(
      //           (a, b) =>
      //             this.salesData.filter((s) => s.productId === b.id).length -
      //             this.salesData.filter((s) => s.productId === a.id).length
      //         )
      //         .slice(0, 5)
      //         .map((p) => p.name),
      //       datasets: [
      //         {
      //           data: this.productsData
      //             .sort(
      //               (a, b) =>
      //                 this.salesData.filter((s) => s.productId === b.id)
      //                   .length -
      //                 this.salesData.filter((s) => s.productId === a.id).length
      //             )
      //             .slice(0, 5)
      //             .map(
      //               (p) =>
      //                 this.salesData.filter((s) => s.productId === p.id).length
      //             ),
      //           backgroundColor: ['orange', 'cyan', 'lime', 'pink', 'purple'],
      //         },
      //       ],
      //     },
      //     options: {
      //       responsive: true,
      //       plugins: {
      //         legend: { position: 'bottom' },
      //       },
      //     },
      //   });
      // }

      //   // 5️⃣ Stacked Bar Chart - Sales Performance per Branch Over Time
      // if (this.stackedBarChartRef) {
      //   this.stackedBarChart = new Chart(
      //     this.stackedBarChartRef.nativeElement,
      //     {
      //       type: 'bar',
      //       data: {
      //         labels: [...new Set(this.salesData.map((s) => s.date))],
      //         datasets: this.branchesData.map((branch) => ({
      //           label: branch.name,
      //           data: [...new Set(this.salesData.map((s) => s.date))].map(
      //             (date) =>
      //               this.salesData
      //                 .filter(
      //                   (s) => s.date === date && s.branchId === branch.id
      //                 )
      //                 .reduce((sum, s) => sum + (s.totalAmount || 0), 0)
      //           ),
      //           backgroundColor:
      //             '#' + Math.floor(Math.random() * 16777215).toString(16),
      //         })),
      //       },
      //       options: {
      //         responsive: true,
      //         scales: {
      //           x: { stacked: true, title: { display: true, text: 'Date' } },
      //           y: { stacked: true, title: { display: true, text: 'Revenue' } },
      //         },
      //         plugins: {
      //           legend: { position: 'top' },
      //         },
      //       },
      //     }
      //   );
      // }
    }, 500);
  }
}
