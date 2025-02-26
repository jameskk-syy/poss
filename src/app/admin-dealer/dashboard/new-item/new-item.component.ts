import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['position', 'name', 'description', 'count', 'branch', 'category', 'price', 'supplier', 'actions'];
  dataSource = new MatTableDataSource<any>();
  newItem: FormGroup;
  branches: any[] = [];
  categories: any[] = [];
  suppliers: any[] = [];
  isEditMode = false;
  isFormOpen = false;
  editingItemId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.newItem = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      count: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      branchId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      supplierId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  loadData(): void {
    Promise.all([
      this.getBranches(),
      this.getSuppliers(),
      this.getCategories()
    ]).then(() => {
      this.getProducts();
    });
  }

  getBranches(): Promise<void> {
    return new Promise((resolve) => {
      this.dashboardService.getAllBranches().subscribe(
        (response: any) => {
          if (response && response.data) {
            this.branches = response.data;
          }
          resolve();
        },
        (error) => {
          console.error(' Error fetching branches:', error);
          resolve();
        }
      );
    });
  }

  getSuppliers(): Promise<void> {
    return new Promise((resolve) => {
      this.dashboardService.getAllSuppliers().subscribe(
        (response: any) => {
          if (Array.isArray(response)) {
            this.suppliers = response;
          } else {
            console.error(" Unexpected API response structure:", response);
          }
          resolve();
        },
        (error) => {
          console.error(' Error fetching suppliers:', error);
          resolve();
        }
      );
    });
  }

  getCategories(): Promise<void> {
    return new Promise((resolve) => {
      this.dashboardService.getAllCategories().subscribe(
        (response: any) => {
          if (response && response.data) {
            this.categories = response.data;
          } else {
            console.error(" Unexpected API response structure:", response);
          }
          resolve();
        },
        (error) => {
          console.error(' Error fetching categories:', error);
          resolve();
        }
      );
    });
  }
  getProducts(): void {
    this.dashboardService.getAllProducts().subscribe(
      (data) => {
        console.log("Fetched Products:", data);
        console.log("Branches:", this.branches);
        console.log("Categories:", this.categories);
        console.log("Suppliers:", this.suppliers);

        this.dataSource =new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        console.log(" Processed Data Source:", this.dataSource);
      },
      (error) => {
        console.error(' Error fetching products:', error);
      }
    );
  }

 toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }
  onSubmit(): void {
    if (this.newItem.valid) {
      if (this.isEditMode && this.editingItemId !== null) {
        this.updateItem();
      } else {
        this.addItem();
      }
    }
  }
  addItem(): void {
    this.dashboardService.createItem(this.newItem.value).subscribe(
      res => {
        alert(res.message);
        this.newItem.reset();
        this.getProducts();
        this.isFormOpen = false;
      },
      err => {
        console.error(' Error adding item:', err);
      }
    );
  }

  editItem(item: any): void {
    this.isEditMode = true;
    this.isFormOpen = true;
    this.editingItemId = item.id;
    this.newItem.patchValue(item);
  }
  updateItem(): void {
    if (this.editingItemId !== null) {
      this.dashboardService.updateItems(this.editingItemId, this.newItem.value).subscribe(
        () => {
          alert(' Item updated successfully!');
          this.newItem.reset();
          this.isEditMode = false;
          this.isFormOpen = false;
          this.editingItemId = null;
          this.getProducts();
        },
        (err) => {
          console.error(' Error updating item:', err);
          alert(' Failed to update item.');
        }
      );
    }
  }
  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.dashboardService.deleteProduct(productId).subscribe(
        () => {
          alert(' Product deleted successfully');
          this.getProducts();
        },
        (error) => {
          console.error(' Error deleting product:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.isFormOpen = false;
    this.editingItemId = null;
    this.newItem.reset();
  }
}
