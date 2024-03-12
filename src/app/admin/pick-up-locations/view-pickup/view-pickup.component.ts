import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ManagePickupsComponent } from '../manage-pickups/manage-pickups.component';
import { PickupService } from '../pickup.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { SubcountiesService } from '../../sub-counties/subcounties.service';

@Component({
  selector: 'app-view-pickup',
  templateUrl: './view-pickup.component.html',
  styleUrls: ['./view-pickup.component.sass']
})
export class ViewPickupComponent implements OnInit {


  loading = false;
  pLoading = false
  pickupLocationForm: FormGroup;
  dialogData: any;
  items: MilkCollectors[] = [];
  wards: any;

  displayedColumns: string[] = ["id", "username"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  routesDataSource!: MatTableDataSource<any>;
  @ViewChild('routesPaginator') routesPaginator!: MatPaginator;
  @ViewChild('routesSort') routesSort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  routesArray: any[] = [];
  routesForm: FormGroup;
  routesDisplayedColumns: string[] = ['index', 'id', 'title'];
  agendasLoading: boolean = true;
  agendasNotAdded: boolean = true;
  updateRouteItem: boolean = false;
  agendasIndex: boolean = true;

  collectorsDataSource!: MatTableDataSource<any>;
  @ViewChild('collectorsPaginator', { static: false })
  collectorsPaginator!: MatPaginator;
  @ViewChild('collectorsSort', { static: false }) collectorsSort!: MatSort;
  collectorsForm: FormGroup;
  collectorsDisplayedColumns: string[] = ['id', 'type'];
  collectorsArray: any[] = [];
  collectorsNotAdded: boolean = true;
  collectorsIndex: any;
  updateCollectorsSelected: boolean = false;

  subCollectorsDataSource: MatTableDataSource<any>
  @ViewChild('subCollectorsPaginator', {static: false}) subCollectorsPaginator : MatPaginator
  @ViewChild('subCollectorsSort', {static: false}) subCollectorsSort : MatPaginator
  subCollectorsForm: FormGroup
  subCollectorsDisplayedColumns = ['id', 'username']
  subCollectorsArray: any[] = []
  subCollectorsNotAdded: boolean = true
  subCollectorsIndex: any;
  updatedSubCollectorsSelected: boolean = false;

  constructor(public dialogRef: MatDialogRef<ManagePickupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private wardsService: SubcountiesService,
    private collectionCenterService: PickupService,) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.pickupLocationForm = this.fb.group({
      route: [this.data.location.name, [Validators.required]],
      routeCode: [this.data.location.subcounty],
      // wardName: [this.data.location.ward],
      landMark: [this.data.location.landmark],
    });

    this.getPickupRouteById(this.data.location.id);

    // this.getMilkCollectors();
  }

  getPickupRouteById(collectionId) {
    this.pLoading = true
    this.collectionCenterService.getRouteById(collectionId).subscribe(
      (res) => {
        console.log('Pick up location', res);
        this.pLoading = false
        this.pickupLocationForm.patchValue({
          id: res.entity.id,
          landMark: res.entity.landMark,
          route: res.entity.route,
          routeCode: res.entity.routeCode,
        });

        this.collectorsArray = res.entity.collectors;

        this.subCollectorsArray = res.entity.subCollectors;

        if(this.subCollectorsArray.length > 0) {
          this.subCollectorsNotAdded= false;
          this.getSubCollectors(this.subCollectorsArray)
        } else {
          this.subCollectorsNotAdded = true
        }

        if (this.collectorsArray.length > 0) {
          this.collectorsNotAdded = false;
          this.getCollectors(this.collectorsArray);
        } else {
          this.collectorsNotAdded = true;
        }

        this.routesArray = res.entity.routes;

        if (this.routesArray.length > 0) {
          this.agendasNotAdded = false;
          this.getRoutes(this.routesArray);
        } else {
          this.agendasNotAdded = true;
        }
      },
      (err) => {
        this.pLoading = false
        console.log(err);
      }
    );
  }

  // getWards(id: any) {
  //   this.subscription = this.wardsService
  //     .getSubCountyById(id)
  //     .subscribe((res) => {
  //       this.data = res;

  //       console.log('Wards ', this.data);
  //       if (this.data.entity.wards.length > 0) {
  //         this.wards = this.data.entity.wards;
  //       } else {
  //       }
  //     });
  // }

  getRoutes(agendasArray: any) {
    this.routesDataSource = new MatTableDataSource(agendasArray);
    this.routesDataSource.paginator = this.routesPaginator;
  }

  getCollectors(collectorsArray) {
    this.collectorsDataSource = new MatTableDataSource(collectorsArray);
    this.collectorsDataSource.paginator = this.collectorsPaginator;
  }

  getSubCollectors(subCollectorsArray) {
    this.subCollectorsDataSource = new MatTableDataSource(subCollectorsArray);
    this.subCollectorsDataSource.paginator = this.subCollectorsPaginator;
  }

  // getMilkCollectors() {
  //   this.subscription = this.service.getLocationById(this.data.location.id).subscribe(res => {
  //     this.response = res;
  //     this.items = this.response.entity.collectors;
  //     this.dataSource = new MatTableDataSource<any>(this.items);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }

  onClick() {
    this.dialogRef.close();
  }
}

export class MilkCollectors {
  public username: string;
}
