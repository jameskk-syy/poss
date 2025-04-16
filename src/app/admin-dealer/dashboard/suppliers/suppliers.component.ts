import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { NotificationService } from 'src/app/data/services/notification.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.sass']
})
export class SuppliersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'supplierCode', 'supplierName', 'contactPerson', 'phoneNumber', 'emailAddress', 'physicalAddress', 'postalAddress', 'actions'];
  dataSource = new MatTableDataSource<any>();
  newSupplier: FormGroup;
  isEditMode = false;
  isFormOpen = false;
  editingSupplierId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  salesItemForm!: FormGroup;
  constructor(private fb: FormBuilder, private dashboardService: DashboardService,
    private notificationApi:NotificationService
  ) {

  }

  ngOnInit(): void {
    this.salesItemForm = this.fb.group({
      clientId:['',Validators.required],
      itemId: [null, Validators.required],
      itemName: ['', Validators.required],
      itemBrand: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0.00, [Validators.required, Validators.min(0)]],
      discount: [0.00, [Validators.min(0)]],
      storeId: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.salesItemForm.valid) {
      const data = {
        sellDate: Date.now(),
        type: "CASH",
        station: this.salesItemForm.controls.storeId.value,
        salesItems: [  // 👈 wrap in array
          {
            itemName: this.salesItemForm.controls.itemName.value,
            itemId: this.salesItemForm.controls.itemId.value
          }
        ]
      };
  
      this.dashboardService.addSale(data, this.salesItemForm.controls.clientId.value).pipe().subscribe(
        res => {
          this.notificationApi.alertSuccess("sale added successfully");
          alert(res.message);
          this.salesItemForm.reset();
        },
        err => {
          console.error('Error adding item:', err);
          if (err.error) {
            console.error("Backend Error Message:", err.error);
          }
        }
      );
    }
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getSuppliers(): void {
    this.dashboardService.getAllSuppliers().subscribe(
      (response: any) => {
        console.log("API Response:", response); // Debugging
  
        if (Array.isArray(response)) {
          this.dataSource.data = response; // Assign the array to MatTableDataSource
          setTimeout(() => {
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }
          });
        } else {
          console.error("❌ Unexpected API response structure:", response);
        }
      },
      (error) => {
        console.error('❌ Error fetching suppliers:', error);
      }
    );
  }
  

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
    if (!this.isFormOpen) {
      this.cancelEdit();
    }
  }

  // addSupplier(): void {
  //   this.dashboardService.createSupplier(this.newSupplier.value).subscribe(
  //     res => {
  //       alert(res.message);
  //       // this.newSupplier.reset();
  //       this.getSuppliers();
  //       this.isFormOpen = false;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }


  addSupplier(): void {
    this.dashboardService.createSupplier(this.newSupplier.value).subscribe(
      (res: any) => {
        console.log("✅ Supplier created response:", res); // Log response to check its structure
        if (res?.message) {
          alert(res.message);
        } else {
          alert('Supplier created successfully!'); // Default message if no message is returned
        }
        this.getSuppliers();
        this.isFormOpen = false;
      },
      (err) => {
        console.error("❌ Error creating supplier:", err);
      }
    );
  }
  
  editSupplier(supplier: any): void {
    this.isEditMode = true;
    this.isFormOpen = true;
    this.editingSupplierId = supplier.id;
    this.newSupplier.patchValue(supplier);
  }

  updateSupplier(): void {
    if (this.editingSupplierId !== null) {
      this.dashboardService.updateSuppliers(this.editingSupplierId, this.newSupplier.value).subscribe(
        () => {
          alert('Supplier updated successfully!');
          this.newSupplier.reset();
          this.isEditMode = false;
          this.isFormOpen = false;
          this.editingSupplierId = null;
          this.getSuppliers();
        },
        (err) => {
          console.error('Error updating supplier:', err);
          alert('Failed to update supplier.');
        }
      );
    }
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.dashboardService.deleteSuppliers(id).subscribe(
        () => {
          alert('Supplier deleted successfully');
          this.getSuppliers();
        },
        (error) => {
          console.error('Error deleting supplier:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.isFormOpen = false;
    this.editingSupplierId = null;
    this.newSupplier.reset();
  }
}
