import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CreateBranchComponent } from '../create-branch/create-branch.component';
import { BranchesService } from '../branches.service';

@Component({
  selector: 'app-manager-lkup',
  templateUrl: './manager-lkup.component.html',
  styleUrls: ['./manager-lkup.component.sass']
})
export class ManagerLkupComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "status",
    
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  // selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  Roles: any[] = [];
  currentUser: any;
  subscription!: any;
  isdata: boolean;

  constructor(
    public dialog: MatDialog,
    // private router: Router,
    private snackbar: SnackbarService,
    private branchService: BranchesService,
    public dialogRef: MatDialogRef<CreateBranchComponent>
  ) {}

  ngOnInit(): void {
    this. getRoles()
  }

  getRoles(){
    
    this.isLoading = true;
    this.subscription = this.branchService.getManagers().subscribe({
      next:(res) => {
        this.data = res;
        console.log('managers', res)
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

  onSelectManager(manager: any) {
    console.log('ht', manager); 
    this.dialogRef.close({ manager: { name: manager.userName, id: manager.id } });
    console.log ('manager nm',manager )
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
