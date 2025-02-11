import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { BranchesService } from '../branches.service';

@Component({
  selector: 'app-delete-branch',
  templateUrl: './delete-branch.component.html',
  styleUrls: ['./delete-branch.component.sass']
})
export class DeleteBranchComponent implements OnInit {
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeleteBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private branchService: BranchesService
  ) 
  { }

  ngOnInit(): void {
  }

  onDelete(){
    this.loading = true;
    const branchId = this.data.branch;
    console.log('branchId', branchId)
    this.branchService.deleteBranch(branchId).subscribe({
      next: (res) => {
        this.loading = false;
        this.snackbar.showNotification(res.message, 'success')
        this.dialogRef.close();
        console.log('res', res)
      },

      error: (err) => {
        this.loading = false;
        this.snackbar.showNotification(err.error.message, 'error')
        console.log('err', err)
      }
    })
  }

  onCancel(){
    this.dialogRef.close();
  }

}
