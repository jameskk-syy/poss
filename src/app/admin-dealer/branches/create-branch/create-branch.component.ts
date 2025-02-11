import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchesService } from '../branches.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ViewBranchesComponent } from '../view-branches/view-branches.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ManagerLkupComponent } from '../manager-lkup/manager-lkup.component';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.sass']
})
export class CreateBranchComponent implements OnInit, OnDestroy {
  branchForm!: FormGroup; // Corrected type
  subscription!: Subscription;
  loading: boolean = false; // Initialized
  managers: any;
  managerId: any;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<ViewBranchesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private branchService: BranchesService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    
    this.branchForm = this.fb.group({
      name: ["", [Validators.required]],
      location: ["", [Validators.required]],
      address: ["", [Validators.required]],
      email: ["", [Validators.required]], 
      mobile: ["", [Validators.required]],
      pobox: ["", [Validators.required]],
      manager: ["",[Validators.required]]
    });

    console.log('cvhjhjhfg', this.data)
    if(this.data.action === 'edit'){
      this.branchForm.patchValue({
        name: this.data.branch.name,
        location: this.data.branch.location,
        address: this.data.branch.address,
        email: this.data.branch.email,
        mobile: this.data.branch.mobile,
        pobox: this.data.branch.pobox,
        manager: this.data.branch.manager
      });
      this.title = 'Edit Branch';
    }
    else{
      this.title = 'Create Branch';
    }
  }

  selectManager(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
     
    };
  
    const dialogRef = this.dialog.open(ManagerLkupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.managers = result.manager;
        console.log ('results manager',this.managers)

        this.branchForm.patchValue({
          managerId: this.managers.id,
          manager: this.managers.name
        });

        this.managerId = this.managers.id;
        console.log ('results',this.managers.id)
        console.log ('results userame',this.managers.name)

      }
    })
  }

  
  onClick() {
    this.dialogRef.close();
  }

 
 


  createBranch() {
    
    this.loading = true;

    const formData = this.branchForm.value;
    
    const payload = {
      ...formData,
      manager: this.managerId, 
    };
    console.log('vjhvjh', payload)

    if (this.data.action === 'edit'){
      this.updateBranch();
    }
    else {
      this.subscription = this.branchService.createBranch(payload).subscribe({
        next: (res) => {
          this.loading = false;
          const successMessage = res.message;
          this.snackbar.showNotification("snackbar-success", successMessage);
          this.branchForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          this.loading = false;
          const errorMessage = err.message;
          this.snackbar.showNotification("snackbar-danger", errorMessage);
        }
      });
    }
  }

  updateBranch() {
    const formData = this.branchForm.value;
    
    const payload = {
      ...formData,
      manager: this.managerId,
    };

    console.log('payload', payload)
  
    this.subscription = this.branchService.updateBranch(this.data.branch.id, payload).subscribe({
      next: (res) => {
        this.loading = false;
        const successMessage = res.message;
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.branchForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        this.loading = false;
        const errorMessage = err.message;
        this.snackbar.showNotification("snackbar-danger", errorMessage);
      }
    });
  }

  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}



