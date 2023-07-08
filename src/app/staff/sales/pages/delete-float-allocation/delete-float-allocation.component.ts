import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CollectorsFloatAllocationsComponent } from '../collectors-float-allocations/collectors-float-allocations.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-delete-float-allocation',
  templateUrl: './delete-float-allocation.component.html',
  styleUrls: ['./delete-float-allocation.component.sass']
})
export class DeleteFloatAllocationComponent implements OnInit {

  salesPersonName: any
  allocatedMilkQuantity: any
  isloading: boolean = false

  subscription: Subscription
  @Output() deleteEvent = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<CollectorsFloatAllocationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: SalesService
  ) { }


  ngOnInit(): void {
    this.salesPersonName = this.data.allocation.salesPersonName
    this.allocatedMilkQuantity = this.data.allocation.allocatedMilkQuantity
  }

  onDelete(){
    this.isloading = true
    this.subscription = this.service.deleteAllocation(this.data.allocation.id)
    .subscribe((res)=> {
      this.isloading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.dialogRef.close();
      this.deleteEvent.emit()
    },
    (err)=> {
      this.isloading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
      this.deleteEvent.emit()
    })
  }

  onCancel(){
    this.dialogRef.close()
  }


}
