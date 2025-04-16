import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.sass']
})
export class BranchComponent implements OnInit, AfterViewInit{
  stockForm!: FormGroup;
  constructor(private fb: FormBuilder,private dashboardService:DashboardService,
    private notificationApi:NotificationService
  ) { 
  }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      station: [''],
      quantity: [0, [Validators.required, Validators.min(1)]],
      itemId: [null, Validators.required],
      storeId: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      this.dashboardService.addStock(this.stockForm.value).pipe().subscribe(
        res => {
          this.notificationApi.alertSuccess("store added successfully"); // Log response
          alert(res.message);
          this.stockForm.reset();
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
    }
  }
  ngAfterViewInit(): void {
  }
}
