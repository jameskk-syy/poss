import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BranchesService } from '../branches.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { CreateBranchComponent } from '../create-branch/create-branch.component';

@Component({
  selector: 'app-view-branches',
  templateUrl: './view-branches.component.html',
  styleUrls: ['./view-branches.component.sass']
})
export class ViewBranchesComponent implements OnInit {

  isLoading: boolean;
  isdata: boolean;
  data: any;
  subscription!: Subscription;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string [] = [
    'name',
    'location',
    'email',
    'phone',
    'actions'
  ];
 

 
  constructor(
    private dialog: MatDialog,
    private branchesService: BranchesService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

  }

  createBranch(action: string){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "800px";
      dialogConfig.data = {
        action:action
      };
  
      const dilaogRef = this.dialog.open(CreateBranchComponent, dialogConfig);
  
      dilaogRef.afterClosed().subscribe(res => {
        this.getBranches();
      })

  }

  editCustomer(action:string,){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = { 
      action:action,
      // branch: branch
    }
    console.log('action is ',action)
  

    const dialogRef = this.dialog.open(CreateBranchComponent, dialogConfig);
      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
  }

  getBranches(){
    this.isLoading = true;
    this.subscription = this. branchesService.getBranches().subscribe({
      next:(res) => {
        this.data = res;
        console.log('branches', res)
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
          console.error('Error fetching customer data:', err);
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
