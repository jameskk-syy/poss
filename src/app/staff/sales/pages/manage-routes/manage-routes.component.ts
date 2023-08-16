import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutesService } from 'src/app/admin/routes/routes.service';
import { RouteDetailsComponent } from '../route-details/route-details.component';
import { SalesManagenentComponent } from '../sales-managenent/sales-managenent.component';
// import { AddRouteComponent } from '../add-route/add-route.component';
// import { DeleteRouteComponent } from '../delete-route/delete-route.component';
// import { EditRouteComponent } from '../edit-route/edit-route.component';
// import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-manage-routes',
  templateUrl: './manage-routes.component.html',
  styleUrls: ['./manage-routes.component.sass']
})
export class ManageRoutesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'collectors',
    "farmers",
    'action',
  ];
  


  subscription!: Subscription;
  data: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData() {
    this.isLoading = true
      this.subscription = this.service.fetchRoutes().subscribe(res => {
        this.data = res.entity;
        this.isLoading = false
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  dataSource!: MatTableDataSource<any>;
  isLoading: boolean = false;

  constructor(private router: Router, private dialog: MatDialog,    private service: RoutesService,) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData();
  }

  addRouteCall(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      test: ""
    }
    // this.dialog.open(AddRouteComponent, dialogConfig)
  }

  editRouteCall(route){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      route: route
    }
    // this.dialog.open(EditRouteComponent, dialogConfig)
  }

  deleteRouteCall(route){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      route: route
    }
    // this.dialog.open(DeleteRouteComponent, dialogConfig)
  }

  viewRouteCall(route:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "70%"
    dialogConfig.data = {
      route: route
    }
    this.dialog.open(SalesManagenentComponent, dialogConfig)
  }

  // viewRoleCall(role){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "40%"
  //   dialogConfig.data = {
  //     roles: role
  //   }
  //   this.dialog.open(ViewRoleComponent, dialogConfig)
  // }

}
