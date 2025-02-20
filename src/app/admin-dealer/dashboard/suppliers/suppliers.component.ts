import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.sass']
})
export class SuppliersComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['position', 'name', 'location', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  

  newBranch: FormGroup;

  isFormOpen = false;
  isEditMode = false;        
  editingItemId: number | null = null; 
  editingBranchId: number | null = null; // Track branch being edited
  



  constructor(private fb: FormBuilder,private dashboardService:DashboardService) { 
    // Initialize the form group with controls
    this.newBranch = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      location: ['', [Validators.required]],
    });
  }

  
  ngOnInit(): void {
    this.getBranch();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  onCrtBranch(): void {
    if (this.newBranch.valid) {
      this.dashboardService.createBranch(this.newBranch.value).pipe().subscribe(
        res => {
          alert(res.message);  // Display success message
          this.newBranch.reset(); // Clear form after successful submission
          this.getBranch();
        },
        err => {
          console.error('Error creating branch:', err);  // Log detailed error
          alert('An error occurred while creating the branch. Please try again.');
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
      this.newBranch.reset();
  }

  }


  getBranch(): void {
    this.dashboardService.getAllBranches().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.dataSource = new MatTableDataSource(response.data); // Extract the 'data' array
          setTimeout(() => {
            if (this.paginator) {
              this.dataSource.paginator = this.paginator; // Reattach paginator
            }
          });
        } else {
          console.error("Unexpected API response structure:", response);
        }
      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }
  

  // updateProduct(product: any): void {
  //   console.log('Editing product:', product);
  // }

  editBranch(branch: any): void {
    this.isEditMode = true;
    this.isFormOpen = true;
    this.editingBranchId = branch.id;

    this.newBranch.patchValue({
        name: branch.name,
        location: branch.location
    });
}

updateBranch(): void {
  if (this.newBranch.valid && this.editingBranchId !== null) {
      this.dashboardService.updateBranchs(this.editingBranchId, this.newBranch.value).subscribe(
          res => {
              alert('Branch updated successfully!');
              this.cancelEdit();
              this.getBranch(); // Refresh list
          },
          err => {
              console.error('Error updating branch:', err);
              alert('Failed to update branch.');
          }
      );
  }
}

cancelEdit(): void {
  this.isEditMode = false;
  this.editingBranchId = null;
  this.newBranch.reset();
  this.isFormOpen = false;
}

  // deleteProduct(productId: number): void {
  //   this.dashboardService.deleteProduct(productId).subscribe(
  //     () => {
  //       console.log('Product deleted successfully');
  //       this.getBranch();
  //     },
  //     (error) => {
  //       console.error('Error deleting product:', error);
  //     }
  //   );
  // }

  deleteBranch(id: number): void {
    if (confirm('Are you sure you want to delete this branch?')) {
        this.dashboardService.deleteBranchs(id).subscribe(
            res => {
                alert('Branch deleted successfully!');
                this.getBranch(); // Refresh list
            },
            err => {
                console.error('Error deleting branch:', err);
                alert('Failed to delete branch.');
            }
        );
    }
}
}
