import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'description', 'count', 'branch', 'category', 'price', 'sPrice', 'discount', 'supplier','reOrder','variant','variantId','image','itemID','status','dos','disabled', 'actions'];
  dataSource = new MatTableDataSource<any>();
  newItem: FormGroup;
  branches: any[] = [];
  categories: any[] = [];
  suppliers: any[] = [];
  isEditMode = false;
  isFormOpen = true;
  editingItemId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.newItem = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required]],
      regularBuyingPrice: ['', [Validators.required]],
      sellingPrice: ['', [Validators.required]],
      maxPercentageDiscount: ['', [Validators.required]],
      count: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      branchId: [null, [Validators.required]], 
      categoryId: [null, [Validators.required]],
      supplierId: [null, [Validators.required]],
      reorderLevel: ['', [Validators.required]],
      hasVariants: [false, [Validators.required]],
      variantOfId: ['', [Validators.required]],
      image: ['', [Validators.required]],
      itemID: ['', [Validators.required]],
      docStatus: [false, [Validators.required]],
      defaultUnitOfMeasure: ['', [Validators.required]],
      endOfLife: ['', [Validators.required]],
      disabled: [false, [Validators.required]],
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
          console.error('Error fetching branches:', error);
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
            console.error("Unexpected API response structure:", response);
          }
          resolve();
        },
        (error) => {
          console.error('Error fetching suppliers:', error);
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
            console.error("Unexpected API response structure:", response);
          }
          resolve();
        },
        (error) => {
          console.error('Error fetching categories:', error);
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

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        console.log("Processed Data Source:", this.dataSource);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  onSubmit(): void {
    if (this.newItem.valid) {
      const formData = { 
        ...this.newItem.value, 
        branchId: Number(this.newItem.value.branchId),
        categoryId: Number(this.newItem.value.categoryId),
        supplierId: Number(this.newItem.value.supplierId)
      };

      if (this.isEditMode && this.editingItemId !== null) {
        this.updateItem(formData);
      } else {
        this.addItem(formData);
      }
    }
  }

  addItem(formData: any): void {
    this.dashboardService.createItem(this.newItem.value).subscribe(
      res => {
        alert(res.message);
        this.newItem.reset();
        this.getProducts();
        this.isFormOpen = false;
      },
      err => {
        console.error('Error adding item:', err);
      }
    );
  }

  editItem(item: any): void {
    this.isEditMode = true;
    this.isFormOpen = true;
    this.editingItemId = item.id;
    this.newItem.patchValue(item);
  }

  updateItem(formData): void {
    if (this.editingItemId !== null) {
      this.dashboardService.updateItems(this.editingItemId, this.newItem.value).subscribe(
        () => {
          alert('Item updated successfully!');
          this.newItem.reset();
          this.isEditMode = false;
          this.isFormOpen = false;
          this.editingItemId = null;
          this.getProducts();
        },
        (err) => {
          console.error('Error updating item:', err);
          alert('Failed to update item.');
        }
      );
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.dashboardService.deleteProduct(productId).subscribe(
        () => {
          alert('Product deleted successfully');
          this.getProducts();
        },
        (error) => {
          console.error('Error deleting product:', error);
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

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result.split(',')[1];
        this.newItem.patchValue({ image: base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select an Excel file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      if (sheetData.length > 0) {
        this.processExcelData(sheetData);
      } else {
        alert('No data found in the Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  processExcelData(sheetData: any[]): void {
    const formattedData = sheetData.map((row: any) => ({
      name: row['Item Name'] || '',
      description: 'Imported from Excel',
      regularBuyingPrice: row['Buying Price'] || 0,
      sellingPrice: row['Selling Price'] || 0,
      maxPercentageDiscount: row['Discount (%)'] || 0,
      count: row['Item Quantity'] || 0,
      branchId: this.findIdByName(this.branches, row['Branch']),
      categoryId: this.findIdByName(this.categories, row['Item Group']),
      supplierId: this.findIdByName(this.suppliers, row['Supplier'])
    }));

    this.dashboardService.bulkCreateItems(formattedData).subscribe(
      () => {
        alert('Products imported successfully!');
        this.getProducts();
      },
      (error) => {
        console.error('Error importing products:', error);
        alert('Failed to import products.');
      }
    );
  }

  findIdByName(list: any[], name: string): number | null {
    const item = list.find(i => i.name === name);
    return item ? item.id : null;
  }
}
