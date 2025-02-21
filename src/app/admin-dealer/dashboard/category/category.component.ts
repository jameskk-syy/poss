import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent  implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['catId', 'name', 'description', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  

  newCategory: FormGroup;

  isFormOpen = false;
  isEditMode = false;        
  editingItemId: number | null = null; 
  editingCategoryId: number | null = null; // Track Category being edited



  constructor(private fb: FormBuilder,private dashboardService:DashboardService) { 
    // Initialize the form group with controls
    this.newCategory = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required]],
    });
  }

  
  ngOnInit(): void {
    this.getCategory();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  onCrtCategory(): void {
    if (this.newCategory.valid) {
      this.dashboardService.createCategory(this.newCategory.value).pipe().subscribe(
        res => {
          alert(res.message);  // Display success message
          this.newCategory.reset(); // Clear form after successful submission
          this.getCategory();
        },
        err => {
          console.error('Error creating Category:', err);  // Log detailed error
          alert('An error occurred while creating the Category. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid!');
      alert('Please fill out the form correctly.');
    }
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;

     // Reset form when opening it in add mode
     if (!this.isEditMode) {
      this.newCategory.reset();
  }

  }


  getCategory(): void {
    this.dashboardService.getAllCategories().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.dataSource = new MatTableDataSource(response.data); // Extract the 'data' array
          setTimeout(() => {
            if (this.paginator) {
              this.dataSource.paginator = this.paginator; 
            }
          });
        } else {
          console.error("Unexpected API response structure:", response);
        }
      },
      (error) => {
        console.error('Error fetching Categoryes:', error);
      }
    );
  }
  

  // updateProduct(product: any): void {
  //   console.log('Editing product:', product);
  // }

  editCategory(Category: any): void {
    this.isEditMode = true;
    this.isFormOpen = true;
    this.editingCategoryId = Category.id;

    this.newCategory.patchValue({
        name: Category.name,
        location: Category.location
    });
}

updateCategory(): void {
  if (this.newCategory.valid && this.editingCategoryId !== null) {
      this.dashboardService.updateCategories(this.editingCategoryId, this.newCategory.value).subscribe(
          res => {
              alert('Category updated successfully!');
              this.cancelEdit();
              this.getCategory(); // Refresh list
          },
          err => {
              console.error('Error updating Category:', err);
              alert('Failed to update Category.');
          }
      );
  }
}

cancelEdit(): void {
  this.isEditMode = false;
  this.editingCategoryId = null;
  this.newCategory.reset();
  this.isFormOpen = false;
}

  // deleteProduct(productId: number): void {
  //   this.dashboardService.deleteProduct(productId).subscribe(
  //     () => {
  //       console.log('Product deleted successfully');
  //       this.getCategory();
  //     },
  //     (error) => {
  //       console.error('Error deleting product:', error);
  //     }
  //   );
  // }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this Category?')) {
        this.dashboardService.deleteCategory(id).subscribe(
            res => {
                alert('Category deleted successfully!');
                this.getCategory(); // Refresh list
            },
            err => {
                console.error('Error deleting category:', err);
                alert('Failed to delete Category.');
            }
        );
    }
}
}
