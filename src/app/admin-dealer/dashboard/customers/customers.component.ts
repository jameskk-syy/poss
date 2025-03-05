import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass'],
})
export class CustomersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'customerName',
    'customerEmail',
    'customerPhoneNumber',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  newCustomer: FormGroup;

  isFormOpen = false;
  isEditMode = false;
  editingItemId: number | null = null;
  editingCustomerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {
    this.newCustomer = this.fb.group({
      customerName: ['', [Validators.required, Validators.maxLength(50)]],
      customerEmail: ['', [Validators.required]],
      customerPhoneNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCustomers();
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  onCreateCustomer(): void {
    if (this.newCustomer.valid) {
      this.dashboardService
        .createCustomer(this.newCustomer.value)
        .pipe()
        .subscribe(
          (res) => {
            alert(res.message);
            this.newCustomer.reset();
            this.getCustomers();
          },
          (err) => {
            console.error('Error creating Customer:', err);
            alert(
              'An error occurred while creating the Customer. Please try again.'
            );
          }
        );
    } else {
      console.log('Form is invalid!');
      alert('Please fill out the form correctly.');
    }
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;

    if (!this.isEditMode) {
      this.newCustomer.reset();
    }
  }

  getCustomers(): void {
    this.dashboardService.getAllCustomers().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          // The API is returning an array directly
          this.dataSource = new MatTableDataSource(response);
        } else if (response && response.data) {
          this.dataSource = new MatTableDataSource(response.data);
          setTimeout(() => {
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
          });
        } else {
          console.error('Unexpected API response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching Customeres:', error);
      }
    );
  }

  editCustomer(customer: any): void {
    this.isEditMode = true;
    this.isFormOpen = true;
    this.editingCustomerId = customer.id;

    this.newCustomer.patchValue({
      customerName: customer.customerName,
      customerEmail: customer.customerEmail,
      customerPhoneNumber: customer.customerPhoneNumber,
    });
  }

  updateCustomer(): void {
    if (this.newCustomer.valid && this.editingCustomerId !== null) {
      this.dashboardService
        .updateCustomer(this.editingCustomerId, this.newCustomer.value)
        .subscribe(
          (res) => {
            alert('Customer updated successfully!');
            this.cancelEdit();
            this.getCustomers(); // Refresh list
          },
          (err) => {
            console.error('Error updating Customer:', err);
            alert('Failed to update Customer.');
          }
        );
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editingCustomerId = null;
    this.newCustomer.reset();
    this.isFormOpen = false;
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this Customer?')) {
      this.dashboardService.deleteCustomer(id).subscribe(
        (res) => {
          alert('Customer deleted successfully!');
          this.getCustomers(); // Refresh list
        },
        (err) => {
          console.error('Error deleting Customer:', err);
          alert('Failed to delete Customer.');
        }
      );
    }
  }
}
