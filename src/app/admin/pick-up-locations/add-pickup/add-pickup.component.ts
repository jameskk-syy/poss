import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SubcountiesService } from '../../sub-counties/subcounties.service';
import { ManagePickupsComponent } from '../manage-pickups/manage-pickups.component';
import { PickupService } from '../pickup.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CollectorsLookupsComponent } from 'src/app/staff/dashboard/look-ups/collectors-lookups/collectors-lookups.component';
import { MilkCollectorsLookupComponent } from '../dialogs/milk-collectors-lookup/milk-collectors-lookup.component';
import { SubCountiesLookupComponent } from '../../sub-counties/sub-counties-lookup/sub-counties-lookup.component';
import { Subscription, takeUntil } from 'rxjs';
import { SubCollectorsLookupComponent } from '../dialogs/sub-collectors-lookup/sub-collectors-lookup.component';

@Component({
  selector: 'app-add-pickup',
  templateUrl: './add-pickup.component.html',
  styleUrls: ['./add-pickup.component.sass'],
})
export class AddPickupComponent extends BaseComponent implements OnInit {
  isLinear = false;
  pickupLocationForm: FormGroup;
  dyForm: FormGroup;
  meetingGeneralDeatilsForm: FormGroup;
  activateLookupCollectors: boolean = true;

  activateLookupSubCollectors: boolean = true;
  subCollectorsDataSource: MatTableDataSource<any>
  @ViewChild('subCollectorsPaginator') subCollectorsPaginator : MatPaginator
  @ViewChild('subCollectorsSort') subCollectorsSort : MatSort
  subCollectorsForm: FormGroup
  subCollectorsDisplayedColumns = [
    'index',
    'type',
    'actions',
  ]
  milkSubCollectors = []
  subCollectorsArray: any[] = [];
  subCollectorsNotAdded: boolean = true;
  subCollectorsIndex: any;

  

  routesDataSource!: MatTableDataSource<any>;
  @ViewChild('routesPaginator') routesPaginator!: MatPaginator;
  @ViewChild('routesSort') routesSort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  routesArray: any[] = [];
  routesForm: FormGroup;
  routesDisplayedColumns: string[] = [
    'index',
    'title',
    'actions'
  ];
  agendasLoading: boolean = true;
  agendasNotAdded: boolean = true;
  updateRouteItem: boolean = false;
  agendasIndex: boolean = true;

  collectorsDataSource!: MatTableDataSource<any>;
  @ViewChild('collectorsPaginator', { static: false })
  collectorsPaginator!: MatPaginator;
  @ViewChild('collectorsSort', { static: false }) collectorsSort!: MatSort;
  collectorsForm: FormGroup;
  collectorsDisplayedColumns: string[] = [
    'index',
    'type',
    'actions',
  ];
  collectorsArray: any[] = [];
  collectorsNotAdded: boolean = true;
  collectorsIndex: any;
  updateCollectorsSelected: boolean = false;

  occurrenceIndex: any;

  btnLoading: boolean = false;

  routeIndex: number;

  selection = new SelectionModel<any>(true, []);
  // loading = false;
  addLocationForm: FormGroup;
  dialogData: any;
  milkCollectors = [];
  name: any;
  wards: any;

  displayedColumns: string[] = ['id', 'username', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ManagePickupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private collectionCenterService: PickupService,
    private snackbar: SnackbarService,
    private service: PickupService,
    private wardsService: SubcountiesService,
    private dialog: MatDialog
  ) {
    super();
  }

  // subscription!: Subscription;

  ngOnInit(): void {
    // this.currentUser = this.tokenStorage.getUser();

    // this.username = this.currentUser.username;

    this.pickupLocationForm = this.createPickupLocationForm();

    this.routesForm = this.createRoutesForm();

    this.collectorsForm = this.createCollectorssForm();
    this.subCollectorsForm = this.createSubCollectorsForm();
  }

  getWards(id: any) {
    this.subscription = this.wardsService.getSubCountyById(id).subscribe(res => {
      this.data = res;

      console.log("Wards ", this.data)
      if (this.data.entity.wards.length > 0) {
        this.wards = this.data.entity.wards;
      }
      else {
      }
    })
  }


  pickSubCountyDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(SubCountiesLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.pickupLocationForm.patchValue({
        subCounty: this.dialogData.data.subcounty,
        subcounty_fk: this.dialogData.data.id
      });

      this.getWards(this.dialogData.data.id);
    });
  }

 

  createPickupLocationForm(): FormGroup {
    return this.fb.group({
      collectors: new FormArray([]),
      subCollectors: new FormArray([]),
      landMark: ['', [Validators.required]],
      routeCode: ['', [Validators.required]],
      route: ['', [Validators.required]],
    });
  }

  createRoutesForm(): FormGroup {
    return this.fb.group({
      route: ['', [Validators.required]],
    });
  }

  createCollectorssForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  createSubCollectorsForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]]
    })
  }

  createMinutesForm(): FormGroup {
    return this.fb.group({
      file: [''],
      fileName: [''],
      fileType: [''],
    });
  }

  milkCollectorsLookup() {
    const dialogRef = this.dialog.open(MilkCollectorsLookupComponent, {
      width: "800px",
      data: {
        action: "Meeting Categories Lookup",
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        let collectors: any[] = [];
        collectors = result.data;
        if (collectors.length > 0) {
        

          collectors.forEach((collector) => {

            this.collectorsForm.patchValue({
              username: collector.username,
            });

            this.collectorsArray.push(this.collectorsForm.value);

            this.collectorsForm.reset();
          });

          if (this.collectorsArray.length > 0) {
            this.collectorsNotAdded = false;

            this.getCollectors(this.collectorsArray);

            
          } else {
            this.collectorsNotAdded = true;
          }

          this.collectorsNotAdded = false;
        }

        this.activateLookupCollectors = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  subCollectorsLookup() {
    const dialogRef = this.dialog.open(SubCollectorsLookupComponent, {
      width: "800px",
      data: {
        action: "Meeting Categories Lookup"
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        let subcollectors = result.data

        if(subcollectors.length > 0) {
          subcollectors.forEach(subCollector => {
            this.subCollectorsForm.patchValue({
              username: subCollector.username
            });

            this.subCollectorsArray.push(this.subCollectorsForm.value)
            this.subCollectorsForm.reset()
          });

          if (this.subCollectorsArray.length > 0) {
            this.subCollectorsNotAdded = false
            this.getSubCollectors(this.subCollectorsArray);
          } else {
            this.subCollectorsNotAdded = true
          }
          this.subCollectorsNotAdded = false
        }

        this.activateLookupSubCollectors = true
      }
    })
  }

  clearMilkCollectors(){
    this.collectorsArray = [];
    this.getCollectors(this.collectorsArray);
    this.collectorsNotAdded = true;

    this.activateLookupCollectors = true;
  }

  clearSubCollectors() {
    this.subCollectorsArray = [];
    this.getSubCollectors(this.subCollectorsArray);
    this.subCollectorsNotAdded = true;
    this.activateLookupSubCollectors = true
  }

  /** Form Initialisation Methods End*/


  get f() {
    return this.pickupLocationForm.controls;
  }


  get collectorsFormControl() {
    return this.f.collectors as FormArray;
  }

  get subCollectorsFormControl() {
    return this.f.subCollectors as FormArray;
  }


  get routesFormControl() {
    return this.f.routes as FormArray;
  }


  onRemoveAttendee(i: any) {
    if (i > 0) {
      this.collectorsFormControl.removeAt(i);
    }
  }

  /** Routes Management Begins */
  addRoute() {
    this.routesArray.push(this.routesForm.value);

    if (this.routesArray.length > 0) {
      this.agendasNotAdded = false;
    } else {
      this.agendasNotAdded = true;
    }

    console.log("Routes Array ", this.routesArray)
    this.getRoutes(this.routesArray);

    this.routesForm.reset();
  }

  updateRouteCall(i, data) {
    this.routeIndex = i;

    this.updateRouteItem = true;
    this.routesForm.patchValue({
      route: data.route,
    });
  }

  updateRoute() {
    this.routesArray[this.routeIndex] = this.routesForm.value;

    this.getRoutes(this.routesArray);

    this.routesForm.reset();

    this.updateRouteItem = false;
  }


  removeRoute(i) {
    this.routesArray.splice(i, 1);

    if (this.routesArray.length > 0) {
      this.agendasNotAdded = false;
    } else {
      this.agendasNotAdded = true;
    }

    this.getRoutes(this.routesArray);
  }

  getRoutes(agendasArray: any) {
    this.routesDataSource = new MatTableDataSource(agendasArray);
    this.routesDataSource.paginator = this.routesPaginator;
  }

  /** Routes Management Ends */

 /** Milk Collectors Start */

  removeCollector(index: any) {
    this.collectorsArray.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.collectorsArray);
    this.collectorsDataSource.paginator = this.collectorsPaginator;
  }

  removeSubCollector(index: any) {
    this.subCollectorsArray.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.subCollectorsArray)
    this.subCollectorsDataSource.paginator = this.subCollectorsPaginator
  }
 

  getCollectors(collectorsArray) {
    this.collectorsDataSource = new MatTableDataSource(collectorsArray);
    this.collectorsDataSource.paginator = this.collectorsPaginator;
  }

  getSubCollectors(subCollectorsArray) {
    this.subCollectorsDataSource = new MatTableDataSource(subCollectorsArray);
    this.subCollectorsDataSource.paginator = this.subCollectorsPaginator
  }
  
  /** Milk Collectors Ends */



  createCollectionCenter() {
    this.btnLoading = true;

    this.collectorsArray.forEach((collector) => {
      this.collectorsFormControl.push(this.fb.group(collector));
    });

    this.routesArray.forEach((route) => {
      this.routesFormControl.push(this.fb.group(route));
    });


    console.log('Collection Center Form ', this.pickupLocationForm.value);



    this.collectionCenterService.addNewRoute(this.pickupLocationForm.value)
    .subscribe(res => {
      this.btnLoading = false;
      console.log("Response : "+ res)
      this.snackbar.showNotification("snackbar-success", res.message);
      this.pickupLocationForm.reset();
      this.dialogRef.close();
     
        },
        (err) => {
          console.log(err);

          this.btnLoading = false;

          this.snackbar.showNotification(
            "snackbar-danger",
            "Unable to complete the requested operation, an error occurred !"
          );
        }
      );
  }
}
