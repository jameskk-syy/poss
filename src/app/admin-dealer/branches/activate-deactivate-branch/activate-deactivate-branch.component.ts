import { Component, Inject, OnInit } from '@angular/core';
import { BranchesService } from '../branches.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activate-deactivate-branch',
  templateUrl: './activate-deactivate-branch.component.html',
  styleUrls: ['./activate-deactivate-branch.component.sass']
})
export class ActivateDeactivateBranchComponent implements OnInit {

  loading: boolean;
  action: string;
  branchName: any;
  subscription: Subscription;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private branchService: BranchesService,
    private dialogRef: MatDialogRef<ActivateDeactivateBranchComponent>
  ) { }

  ngOnInit(): void {
    this.action = this.data.action;
    this.branchName = this.data.branchName;
    console.log('actions', this.action)
    console.log('branchdd', this.data.branchName)
  }

  activateBranch(){
    this.loading = true;
    const branchId = this.data.branch
    this.subscription = this.branchService.activateBranch(branchId).subscribe({
      next: (res) => {
        this.loading = false;
        const successMessage = res.message;
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.dialogRef.close();
        console.log('res', res)
      },
      error: (err) => {
        this.loading = false;
        const errorMessage = err.error.message;
        this.snackbar.showNotification("snackbar-error", errorMessage);
        this.dialogRef.close();
      }
    })
  }

  deactivateBranch(){
    this.loading = true;
    const branchId = this.data.branch
    this.subscription = this.branchService.deactivateBranch(branchId).subscribe({
      next: (res) => {
        this.loading = false;
        const successMessage = res.message;
        this.snackbar.showNotification("snackbar-success", successMessage);
        this.dialogRef.close();
        console.log('res', res)
      },
      error: (err) => {
        this.loading = false;
        const errorMessage = err.error.message;
        this.snackbar.showNotification("snackbar-error", errorMessage);
        this.dialogRef.close();
      }
    })
  }



  onCancel(){
    this.dialogRef.close();
  }

}
