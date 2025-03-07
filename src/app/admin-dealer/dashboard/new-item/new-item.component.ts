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
  isFormOpen = false;
  editingItemId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.newItem = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      regularBuyingPrice: ['', [Validators.required,Validators.min(0)]],
      sellingPrice: ['', [Validators.required,, Validators.min(0)]],
      maxPercentageDiscount: ['', [Validators.required]],
      count: ['', [Validators.required, Validators.min(1)]],
      branchId: [null, [Validators.required]], 
      categoryId: [null, [Validators.required]],
      supplierId: [null],
      reorderLevel: [0],
      hasVariants: [false],
      variantOfId: [null],
      image: [null],
      itemID: ['', [Validators.required]],
      docStatus: [false],
      defaultUnitOfMeasure: ['', [Validators.required]],
      endOfLife: [null],
      disabled: [false],
    },{updateOn: 'submit'});
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
      console.log("Form Data being sent:", formData); 
      if (this.isEditMode && this.editingItemId !== null) {
        this.updateItem(formData);
      } else {
        this.addItem();
        console.log(formData)
      }
    }
  }

  addItem(): void {
    if(this.newItem.valid){
      const formData=this.newItem.value;
      console.log("Submitting Payload:",formData); //logs payload bfr sending
    
    this.dashboardService.createItem(formData).subscribe(
      res => {
        console.log("This is the response:", res); // Log response
        alert(res.message);
        this.newItem.reset();
        this.getProducts();
        this.isFormOpen = false;
      },
      err => {
        console.error('Error adding item:', err); // Log full error
        if (err.error) {
          console.error("Backend Error Message:", err.error);
        }
      }
    );
  } else{
    console.warn("Form is Invalid. Please check the inputs.",this.newItem.errors);
  }
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

  // onImageUpload(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const base64Image = e.target.result.split(',')[1];
  //       this.newItem.patchValue({ image: base64Image });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newItem.patchValue({ image: file }); // Store the file object directly
    }
  }

  // onFileUpload(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file); // Append the file directly
  
  //     this.dashboardService.uploadExcelFile(formData).subscribe(
  //       response => {
  //         alert('File uploaded successfully!');
  //         this.getProducts(); // Refresh the product list if necessary
  //       },
  //       error => {
  //         console.error('Error uploading file:', error);
  //         alert('Failed to upload file.');
  //       }
  //     );
  //   }
  // }

  // In your component file (.ts)
onFileUpload(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file); // Make sure this key matches what your API expects
    
    console.log('Uploading file:', file.name); // Debug log
    
    this.dashboardService.uploadExcelFile(formData).subscribe({
      next: (response) => {
        console.log('Upload response:', response); // Debug log
        alert('File uploaded successfully!');
        this.getProducts(); // Refresh the product list
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        alert(`Failed to upload file: ${error.message || 'Unknown error'}`);
      }
    });
  }
}

  
  
}
