
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { StockManagementComponent } from '../../stock-management/stock-management.component';
import { StockService } from '../../stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.sass']
})
export class AddStockComponent implements OnInit {

  loading = false;
  isLoading = false;
  subscription!: Subscription;
  stockForm: FormGroup;
  categories: any;
  isdata: boolean;


  constructor(
    public dialogRef: MatDialogRef<StockManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private service:StockService
  ) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      
      whseCode: ['', Validators.required],
      skuId: ['',Validators.required],
      count: ['', Validators.required],
    });  
  }

  onSubmit(){

  }

  onClick() {
    this.dialogRef.close();
  }


}
