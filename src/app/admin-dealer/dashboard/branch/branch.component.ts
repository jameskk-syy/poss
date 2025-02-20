import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.sass']
})
export class BranchComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['position', 'name', 'location', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isFormOpen = false;

  newBranch: FormGroup;
  branches: any[] = []; // Store fetched branches


  constructor(private fb: FormBuilder,private dashboardService:DashboardService) { 
    // Initialize the form group with controls
    this.newBranch = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      location: ['', [Validators.required]],
      branchId: ['', [Validators.required]] 
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
  

  updateProduct(product: any): void {
    console.log('Editing product:', product);
  }

  deleteProduct(productId: number): void {
    this.dashboardService.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.getBranch();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}
