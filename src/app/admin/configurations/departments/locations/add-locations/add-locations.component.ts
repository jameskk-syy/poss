import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigurationsService } from '../../../configurations.service';
import { LocationsComponent } from '../locations/locations.component';

@Component({
  selector: 'app-add-locations',
  templateUrl: './add-locations.component.html',
  styleUrls: ['./add-locations.component.sass']
})
export class AddLocationsComponent implements OnInit {

  loading = false;
  locationForm : FormGroup;
  subscription!: Subscription;
  title:string;
  departments: any;

  constructor(
    public dialogRef: MatDialogRef<LocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private configurationsService:ConfigurationsService
  ) 
    { }


  ngOnInit(): void {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      department:['',Validators.required]      
    });

    console.log('Action:', this.data.action);

    if (this.data.action === 'edit') {
      this.locationForm.patchValue({
        name: this.data.location.name,
        department: this.data.location.department
      });
      this.title = 'Edit Location';
    } else {
      this.title = 'Add Location'; 
    }
  }

//   onSubmit() {
    
//     const selectedCategory = this.productForm.value.category;
//       console.log('cjj', selectedCategory);
//       if (selectedCategory && selectedCategory.id) {
//         const categoryId = selectedCategory.id;

//       this.subscription = this.service.addProduct(this.productForm.value, categoryId).subscribe({
//         next: (res) => {
//         this.loading = false;
//         console.log ('jhdjh', this.productForm )
//         const successMessage = res.message
//         this.snackbar.showNotification("snackbar-success", successMessage);
//         this.productForm.reset();
//         this.dialogRef.close();
//         }, 
//       error: (err) => {
//         this.loading = false;
//         const errorMessage = err.message
//         this.snackbar.showNotification("snackbar-danger", errorMessage);
//         this.dialogRef.close();
//         }
//       }
//     )
//   }
// }
  


  getDepartmentData() {
    this.loading = true;
    this.subscription = this.configurationsService.getDepartments().subscribe(res => {
        this.departments= res.entity
    }, error => {
        this.loading = false;
        console.error('Error fetching categories:', error);
    });
}


  onSubmit() {
    if (this.locationForm.invalid) {
      return;  
    }

    this.loading = true;

    // Call update method if editing
    if (this.data.action === 'edit') {
      this.updateLocation();
    } else {
      // Add new category
      this.subscription = this.configurationsService.addLocation(this.locationForm.value).subscribe({
        next: (res) => {
        this.loading = false;
        const successMessage = res.message
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.locationForm.reset();
        this.dialogRef.close();
        },  
        error: (err) => {
        this.loading = false;
        const errorMessage = err.message
        this.snackbar.showNotification("snackbar-danger", errorMessage);
        this.dialogRef.close();
        }
    })
    }
  }

  updateLocation() {
    this.loading = true;
    this.subscription = this.configurationsService.updateLocation(this.data.category).subscribe({
    next: (res) => {
      this.loading = false;
      const successMessage = res.message
      this.snackbar.showNotification("snackbar-success", successMessage);
      this.dialogRef.close(true);
      },
      error: (err) =>{
      this.loading = false;
      const errorMessage = err.message
      this.snackbar.showNotification("snackbar-danger", errorMessage);
      }

      })
    }

  onClick() {
    this.dialogRef.close();
  }

}
