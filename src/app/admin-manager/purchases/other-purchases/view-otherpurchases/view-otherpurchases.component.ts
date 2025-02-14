import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CreateLubesPurchaseComponent } from '../../lubes-purchases/create-lubes-purchase/create-lubes-purchase.component';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-view-otherpurchases',
  templateUrl: './view-otherpurchases.component.html',
  styleUrls: ['./view-otherpurchases.component.sass']
})
export class ViewOtherpurchasesComponent implements OnInit {

   isLoading: boolean;
      isdata: boolean;
      data: any;
      subscription!: Subscription;
      dataSource!: MatTableDataSource<any>;
      displayedColumns: string [] = [
        // 'id',
        // 'productName',
        // 'quantity',
        // 'ViewSupplier',
        // 'action'
      ];
     
    
     
      constructor(
        private dialog: MatDialog,
        private purchasesService: PurchasesService
      ) { }
    
      @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
      @ViewChild(MatSort, { static: true }) sort: MatSort;
      @ViewChild("filter", { static: true }) filter: ElementRef;
      @ViewChild(MatMenuTrigger)
      contextMenu: MatMenuTrigger;
      contextMenuPosition = { x: "0px", y: "0px" };
    
      ngOnInit(): void {
    
      }
    
      createPurchase(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false
        dialogConfig.autoFocus = true
        dialogConfig.width = "800px"
        dialogConfig.data = { 
          
        }
          
    
        const dialogRef = this.dialog.open(CreateLubesPurchaseComponent, dialogConfig);
          dialogRef.afterClosed().subscribe ({
          next:(value) => {
            this.ngOnInit()
          }
          });
        }
    
    
        
      
    
       
      
      getPurchases(){
        this.isLoading = true;
        this.subscription = this.purchasesService.getFuelPurchases().subscribe({
          next:(res) => {
            this.data = res;
            console.log('custommm', res)
              if (this.data.entity.length > 0) {
                this.isLoading = false;
                this.isdata = true;
                // Binding with the datasource
                this.dataSource = new MatTableDataSource(this.data.entity);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              } else {
                this.isLoading = false;
                this.dataSource = new MatTableDataSource<any>(this.data);
              }
            },
            error: (err) => {
              this.isLoading = false;
              console.error('Error fetching departments data:', err);
              this.isdata = false;
            }
        })
      }
    
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

}
