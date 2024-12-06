import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchesService } from '../branches.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ViewBranchesComponent } from '../view-branches/view-branches.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<ViewBranchesComponent>,
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
        console.log ('results role',this.managers)

        this.branchForm.patchValue({
          managerId: this.managers.id,
          managers: this.managers.name
        });

      }
    })
  }

  
  onClick() {
    this.dialogRef.close();
  }

 
  createBranch() {
    this.loading = true;
    this.subscription = this.branchService.createBranch(this.branchForm.value).subscribe({
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
