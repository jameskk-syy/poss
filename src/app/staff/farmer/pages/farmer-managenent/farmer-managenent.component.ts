import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, identity } from 'rxjs';
import { FarmerService } from '../../services/farmer.service';
import { DeleteFarmerComponent } from '../delete-farmer/delete-farmer.component';
import { FarmerDetailsComponent } from '../farmer-details/farmer-details.component';
import { RegisterFarmerComponent } from '../register-farmer/register-farmer.component';
import { UpdateFarmerComponent } from '../update-farmer/update-farmer.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FarmerLookupComponent } from '../farmer-lookup/farmer-lookup.component';
import { Activity } from 'angular-feather/icons';

@Component({
  selector: 'app-farmer-managenent',
  templateUrl: './farmer-managenent.component.html',
  styleUrls: ['./farmer-managenent.component.sass']
})
export class FarmerManagenentComponent implements OnInit {
  filterform:FormGroup
  selected = "";
  statusFilter="";
  activityFilter="";

  displayedColumns: string[] = [
    'id',
    "farmer_no",
    "username",
    "mobile_no",
    "id_number",
    "route",
    'action',
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  dialogData: any;
  farmerForm: any;
  col: any;
  activity: string;
  constructor(private router: Router, private dialog: MatDialog, private service: FarmerService,private fb:FormBuilder) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onStatusChange(selectedStatus: string) {
    if (selectedStatus === 'ap') {
      this.getApprovedFarmers();
    } else if (selectedStatus === 'pe') {
      this.getPendingFarmers();
    }
  }
  getPendingFarmers() {
    this.isLoading = true;
    this.subscription = this.service.fetchFarmers().subscribe(
      (res) => {
        this.data = res;
        const pendingFarmers = this.data.entity.filter((farmer) => farmer.status === 'Pending');
  
        if (pendingFarmers.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.displayedColumns = [
            'id',
            'farmer_no',
            'username',
            'mobile_no',
            'id_number',
            'route', 
            'action'
          ];
          const columnToPropertyMap = {
            'id':'id',
            'farmer_no': 'farmerNo', 
            'username': 'username',
            'mobile_no': 'mobileNo',
            'id_number': 'idNumber',
            'route':'routeFk',
            'action':''
          };
          const mappedPendingFarmers = pendingFarmers.map((farmer) => {
            const mappedFarmer = {};
            for (const column of this.displayedColumns) {
              const property = columnToPropertyMap[column] || column;
              mappedFarmer[column] = farmer[property];
            }
            return mappedFarmer;
          });
          this.dataSource = new MatTableDataSource(mappedPendingFarmers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
         
        } else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource([]);
        }
      },
      (error) => {
        console.log('An error occurred:', error);
        this.isdata = false;
        this.isLoading = false;
      }
    );
   }

   getApprovedFarmers() {
    this.isLoading = true;
    this.subscription = this.service.fetchFarmers().subscribe(
      (res) => {
        this.data = res;
        const approvedFarmers = this.data.entity.filter((farmer) => farmer.status === 'Approved');
  
        if (approvedFarmers.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.displayedColumns = [
            'id',
            'farmer_no',
            'username',
            'mobile_no',
            'id_number',
            'route', 
            'action'
          ];
          const columnToPropertyMap = {
            'id':'id',
            'farmer_no': 'farmerNo', 
            'username': 'username',
            'mobile_no': 'mobileNo',
            'id_number': 'idNumber',
            'route':'routeFk',
            'action':''
          };
          const mappedApprovedFarmers = approvedFarmers.map((farmer) => {
            const mappedFarmer = {};
            for (const column of this.displayedColumns) {
              const property = columnToPropertyMap[column] || column;
              mappedFarmer[column] = farmer[property];
            }
            return mappedFarmer;
          });
          this.dataSource = new MatTableDataSource(mappedApprovedFarmers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource([]);
        }
      },
      (error) => {
        console.log('An error occurred:', error);
        this.isdata = false;
        this.isLoading = false;
      }
    );
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
      
    })
  }
  // getCollections() {
  //   this.selected = "";
  //   this.isLoading = true;
  //   this.subscription = this.service.farmerCollections().subscribe(res => {
  //     this.col = res;
  //     console.log(res)
  //     if (this.col.entity.length > 0) {
  //       this.isLoading = false;
  //       this.col = true;
  //       // Binding with the datasource
  //       this.dataSource = new MatTableDataSource(this.col.entity);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     }
  //     else {
  //       this.col = false;
  //       this.dataSource = new MatTableDataSource<any>(this.col);
  //     }
  //   },error => {
  //     console.log('An error occurred:', error)
      
  //   })
  // }

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
      // noDeliveries: [""],
      activity: [""],
      status: [""]
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
    // const dialogRef = this.dialog.open(FarmerCollectionsComponent, dialogConfig)
    this.dialog.open(FarmerDetailsComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe((res)=> {
    //   this.getData()
    // })


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
         
          this.isLoading = false;
          this.isdata = true;
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
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(null);
        }
      })
    }
  }
  getFarmersWithNoDeliveries() {
    this.selected = "";
    this.isLoading = true;
  
    this.subscription = this.service.farmersWithNoDeliveries().subscribe(res => {
      this.data = res;
  
      if (this.data.entity != null) {
        const result = this.data.entity; 
  
        this.isLoading = false;
        this.isdata = true;
  
        this.dataSource = new MatTableDataSource(result.map(v => ({
          username: v.username,
          farmer_no: v.farmerNo,
          mobile_no: v.mobileNo,
          actions:''
        })));
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.isdata = false;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource([]);
      }
    });
  }
  
  onStatusChanged(selectedActivity: string) {
    this.activityFilter = selectedActivity; // Update the activityFilter property
    if (selectedActivity === 'active') {
      this.getActiveFarmers();
    } else if (selectedActivity === 'inactive') {
      this.getInactiveFarmers();
    }
  }
  getActiveFarmers() {
    this.isLoading = true;
    const activity = this.activityFilter; 
    
    this.subscription = this.service.farmersByActivity(activity).subscribe(
      (res) => {
  
        this.data = res;
  
        if (this.data.entity != null) {
          
          const result = this.data.entity;

  
        this.isLoading = false;
        this.isdata = true;
       
        this.dataSource = new MatTableDataSource(result.map(v => ({
          id: v.id,
          farmer_no: v.farmerNo,
          username: v.username,
          mobile_no: v.mobileNo,
          id_number: v.idNumber,
          route: v.route,
          action: ''
          
        })));
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.isdata = false;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource([]);
      }
    });
  }
  
  getInactiveFarmers() {
    this.isLoading = true;
    const activity = this.activityFilter;
  
    this.subscription = this.service.farmersByActivity(activity).subscribe(
      (res) => {
        if (res === null) {
          this.isLoading = false;
          this.isdata = false;
          this.dataSource = new MatTableDataSource([]);
          return;
        }
  
        this.data = res;
  
        if (this.data.entity !== null) {
          const result = this.data.entity;
  
          this.isLoading = false;
          this.isdata = true;
  
          this.dataSource = new MatTableDataSource(result.map(v => ({
            id: v.id,
            farmer_no: v.farmerNo,
            username: v.username,
            mobile_no: v.mobileNo,
            id_number: v.idNumber,
            route: v.route,
            action: ''
          })));
  
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource([]);
        }
      },
      (error) => {
        console.log('An error occurred:', error);
        this.isdata = false;
        this.isLoading = false;
      }
    );
  }
  
  

  }


