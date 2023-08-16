import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FarmerService } from '../../services/farmer.service';
import { DeleteFarmerComponent } from '../delete-farmer/delete-farmer.component';
import { FarmerDetailsComponent } from '../farmer-details/farmer-details.component';
import { RegisterFarmerComponent } from '../register-farmer/register-farmer.component';
import { UpdateFarmerComponent } from '../update-farmer/update-farmer.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoutesLookUpComponent } from 'src/app/staff/sales/pages/routes-look-up/routes-look-up.component';

@Component({
  selector: 'app-farmer-managenent',
  templateUrl: './farmer-managenent.component.html',
  styleUrls: ['./farmer-managenent.component.sass']
})
export class FarmerManagenentComponent implements OnInit {
  filterform:FormGroup
  selected = "";

  displayedColumns: string[] = [
    'id',
    "farmer_no",
    "username",
    "mobile_no",
    "ID No.",
    "route",
    'action',
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  dialogData: any;
  form: any;
  constructor(private router: Router, private dialog: MatDialog, private service: FarmerService,private fb:FormBuilder) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData() {
    this.selected = "";
    this.isLoading = true;
    this.subscription = this.service.getFarmers().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    },error => {
      console.log('An error occurred:', error)
      this.isdata = false;
      this.isLoading = false
    })
  }

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.filterform= this.fb.group({
      farmer_no: [""],
      route: [""],
      routeId: [""]
    })
    this.form = this.fb.group({
      route: [""],
      routeId: [""]
    })
    this.getData();
  }

  addCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "65%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(RegisterFarmerComponent, dialogConfig)
  }

  viewFarmerDetails(data:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "65%"
    dialogConfig.data = {
      farmer: data
    }
    this.dialog.open(FarmerDetailsComponent, dialogConfig)
  }

  editCall(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "65%"
    dialogConfig.data = {
      farmer: data
    }
    this.dialog.open(UpdateFarmerComponent, dialogConfig)
  }

  deleteCall(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      farmer: data
    }
    this.dialog.open(DeleteFarmerComponent, dialogConfig)
  }

  viewFarmerCollections(row) {

    this.router.navigate(['/staff/sales/farmer', row.id]);
  }

  // filterFarmers() {
  //   if (this.selected == 'fn') {
  //  this.getFarmerByFarmerNo();
  //   }
  // }
  getFarmerByFarmerNo(){
    this.isLoading = true;
    let farmerNo=this.filterform.value.farmer_no
    // {}
      
    if (farmerNo != null && farmerNo != undefined ) {
  
      this.subscription = this.service.getByFarmersByFarmerNo(farmerNo).subscribe(res => {
        this.data = res;
        if (this.data.entity!=null) {
          let result = []
          result.push(this.data.entity)
         
          this.isdata = true;
          this.isLoading = false;
          // Binding with the datasource
          this.dataSource = new MatTableDataSource(result.map(v=>({
            username:v.username,
            route:v.routeName,
            id_number: v.idNumber,
            farmer_no: v.farmerNo,
            mobile_no: v.mobileNo

          })));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.isLoading = false;
          this.isdata = false;
          this.dataSource = new MatTableDataSource(null);
        }
      })
    }
  }

  onInputChange() {
    const inputValue = this.filterform.get("farmer_no").value;
    let farmerNo = inputValue;
    this.isLoading = true;
  }

  selectRoute() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      data: "",
    };
    const dialogRef = this.dialog.open(RoutesLookUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log("Routes", result)
      this.dialogData = result;
      this.form.patchValue({
        route: this.dialogData.data.route,
        routeId: this.dialogData.data.id
      });
      let rid = this.form.value.routeId
      console.log(rid)
      // this.getfarmersPerRoute(rid)
      this.filterByRoute(rid)
    });
  }
  filterByRoute(id: any) {
    this.isLoading = true
    // this.getfarmersPerRoute(id)
    console.log("passed route id is " + id)

    this.subscription = this.service.getFarmersByRoutes(id).subscribe(res => {
      this.data = res
      console.log("data: "+ this.data.entity)
      if (this.data.entity.length > 0) {
        this.isLoading = false
        this.data = true
        let result = []
        result.push(this.data.entity)
        console.log(result)
        this.dataSource = new MatTableDataSource(result)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      } else {
        this.isLoading = false;
        this.data = false
        this.dataSource = new MatTableDataSource(null)
      }
    })
  }

  getfarmersPerRoute(routeId) {
    this.isLoading = true
  console.log("Route id "+ routeId)
    this.subscription = this.service.getFarmersByRoutes(routeId).subscribe(res => {
      this.data = res;
      if (this.data > 0) {
        this.isLoading = false
        console.log("Farmer Routes",this.data)
        let result = []
        result.push(this.data.entity)
        this.isLoading = false;
        this.data = true;

        //bind the data
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      } else {
        this.isdata = false;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(null)
      }
    });

  }
}
