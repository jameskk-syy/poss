import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { NotificationService } from 'src/app/data/services/notification.service';
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
  suppliers: any[] = [];
  isEditMode = false;
  productForm!: FormGroup;
  isFormOpen = false;
  editingItemId: number | null = null;
  categories = [
    { id: 10, name: 'Category A' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService
    ,private notificationApi:NotificationService
  ) {
  
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      itemCode: ['', Validators.required],
      brand: [''],
      description: [''],
      category: [null, Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      sellingPrice: [0, [Validators.required, Validators.min(0)]],
      tagId: [null],
      averageDailySales: [0],
      leadTime: [0],
      safetyStock: [0],
      stockAccount: [''],
      salesAccount: ['']
    });
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
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
    if(this.productForm.valid){
      const formData=this.productForm.value;
      console.log("Submitting Payload:",formData); //logs payload bfr sending
    
    this.dashboardService.createItem(formData).subscribe(
      res => {
        console.log("This is the response:", res); // Log response
        this.notificationApi.alertSuccess(res.message);
        this.productForm.reset();
        // this.getProducts();
        // this.isFormOpen = false;
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
