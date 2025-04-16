import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/admin-manager/dashboard/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/data/services/notification.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent  implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['catId', 'name', 'description', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  storeForm!: FormGroup;
  constructor(private fb: FormBuilder,private dashboardService:DashboardService,private notificationApi:NotificationService) { 

  }

  
  ngOnInit(): void {
    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['']
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  onSubmit(): void {
    if (this.storeForm.valid) {

      this.dashboardService.addStore(this.storeForm.value).pipe().subscribe(
        res => {
          this.notificationApi.alertSuccess("store added successfully"); // Log response
          alert(res.message);
          this.storeForm.reset();
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
      const formValue = this.storeForm.value;
      console.log('Form Submitted', formValue);

    }
  }
  
}
