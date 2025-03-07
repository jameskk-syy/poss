import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.sass'],
})
export class SaleslistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'customerName',
    'branch',
    'location',
    'totalAmount',
    'createdAt',
    'referenceNumber',
    'actions', // Add actions column
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  navigateToSdetails() {
    this.router.navigate(['/saledetails']);
  }

  ngOnInit(): void {
    this.getSales();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getSales(): void {
    this.dashboardService.getAllSales().subscribe(
      (data: any) => {
        this.dataSource.data = data;
        console.log('sales', data);
      },
      (error) => {
        console.error('Error fetching sales:', error);
      }
    );
  }

  viewSale(sale: any): void {
    // Navigate to a detail page with the sale ID
    this.router.navigate(['/saledetails', sale.id]);
    // Alternatively, you could open a dialog to show details
    // this.dialog.open(SaleDetailComponent, { data: sale });
  }
}
