import { Component, Inject, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../warehouse.service';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.sass']
})
export class ApproveRequestComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'item',
    'fromWhse',
    'toWhse',
    'message',
    'quantity',
    'requestBy',
    'createdOn',
    'approveStock',
    'status',
    'approvedFlag',
];

data:boolean = false;
isdata: boolean = false;
  form: FormGroup
  subscription!: Subscription;
  isLoading: boolean = false
  pLoading: boolean = false
dataSource!: MatTableDataSource<any>;
requisitionData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private warehouseService: WarehouseService,
    ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.form = this.fb.group({
      approval: [""],})

    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  getData() {
    
    this.isLoading = true;
    this.warehouseService.getRequisitions().subscribe({
      next: (res: any) => {
        if (res.entity.length > 0) {
          this.isLoading = false
          this.data  =true
  
          console.log("data retrieved is ", res)
          this.requisitionData = res.entity;
  
          this.dataSource = new MatTableDataSource(res.entity)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.isLoading = false
          this.data = false
  
          this.dataSource = new MatTableDataSource(null)
        }
      },
      error: (err) => {
        this.isLoading = false
        this.data = false
        console.log("caught error is ", err)
        this.snackBar.showNotification('snackbar-danger', err)
      },
      complete: () => {}
    })
  }

  filterByApproval() {
    this.isLoading = true

    const approvalValue = this.form.get('approval')?.value;

    this.subscription = this.warehouseService.getByApproval(approvalValue)
      .subscribe({
        next:(res) => {
        this.snackBar.showNotification('snackbar-success', 'Successful!');
        this.isLoading = false;
        this.form.reset();
      },
       error: (err) => {
          this.isLoading = false;
          this.snackBar.showNotification('snackbar-danger', err);
              }
  });
  }

  requestStock(id: any){
    this.isLoading = true

    console.log('Requisition Data',this.requisitionData);
    this.subscription = this.warehouseService.approveRequest(id)
      .subscribe({
        next:(res) => {
        this.snackBar.showNotification('snackbar-success', 'Successful!');
        this.isLoading = false;
        this.form.reset();
      },
      error: (err) => {
          this.isLoading = false;
          this.snackBar.showNotification('snackbar-danger', err);
      }
  });
  }

}


