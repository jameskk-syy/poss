import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.sass']
})
export class AllItemsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'description', 'count', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getProducts(): void {
    this.dashboardService.getAllProducts().subscribe(
      (data: any) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  updateProduct(product: any): void {
    console.log('Editing product:', product);
  }

  deleteProduct(productId: number): void {
    this.dashboardService.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.getProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}
