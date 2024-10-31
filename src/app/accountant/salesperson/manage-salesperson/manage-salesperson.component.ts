import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalespersonService } from '../salesperson.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { error } from 'console';
import { query } from '@angular/animations';

@Component({
  selector: 'app-manage-salesperson',
  templateUrl: './manage-salesperson.component.html',
  styleUrls: ['./manage-salesperson.component.sass']
})
export class ManageSalespersonComponent implements OnInit {

  loading: boolean = false;
  isLoading: boolean = false;
  isdata: any;
  dataSource!: MatTableDataSource<any>;
  subscription!: Subscription;
  data: any;
  salesperson: any;

  displayedColumns: string [] = [
    'id',
    'username',
    'mobile',
    'whseCode',
    'ViewCustomers',
    
  ]
  

  

  constructor(
    private salespersonService: SalespersonService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit() {
    this.getData()
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData(){
    this.isLoading = true;
    this.subscription = this.salespersonService.getSalesperson().subscribe({
      next:(res) => {
        this.data = res;
        if(this.data.entity.length > 0){
          this.isLoading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.data.entity)
        }
      },
      error (err){
        this.isLoading = false;
        console.error('error fetching data:', err);
        this.isdata = false;
      }
    })
  }

  viewSalespersonCustomers(salesperson: any){
    this.router.navigate([`salesperson/viewcustomer`, salesperson.userId],
      {queryParams:
        {
          name: salesperson.username
        }
      }
  );
  console.log(salesperson)

  }

  manageCustomers(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false
      dialogConfig.autoFocus = true
      dialogConfig.width = "600px"
      dialogConfig.data = {
        
      }
      this.dialog.open(Component, dialogConfig)
      }
  

  // deactivateSalesperson(isActive: boolean, salesperson:any){
  //   salesperson:isActive = isActive


  // }



}



