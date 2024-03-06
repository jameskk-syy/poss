import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/totals-collector/dashboard.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TotalsCollectionService } from 'src/app/totals-collector/services/totals-collection.service';
import { AddTotalsCollectionsComponent } from '../add-totals-collections/add-totals-collections.component';
import { CollectorsLookupsComponent } from 'src/app/staff/dashboard/look-ups/collectors-lookups/collectors-lookups.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  filterform: FormGroup
  today: Date = new Date();
  formattedDate: string = this.today.toISOString().slice(0, 10);
  date: any;
  fromDate: any;
  toDate: any;
  form: FormGroup;
  selected = "";
  selectedvalue = "";
  milkQuantity: any = 0.0;
  damount: any = 0.0;
  datasize:any=0;
  collectors: any[] = [];
  filename = "totalscollections for " + this.today;
  

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  displayedColumns: string[] = [
    'id',
    "collectorUsername",
    'milkQuantity',
    "accumulatorName",
    "routeName",
    "session",
    "collectionDate",
    "milkDensity",
    "milkPH",
    
    // "milkTemperature",
    // "milkOrgSmell",
    // "milkOrgSight"
    
  ];
  currentDate: any

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  accumulatorId: any;
  collectorId: any;
  MILK_COLLECTOR: string;
  dialogData: any;

  constructor(
    private router: Router, private datePipe: DatePipe, private fb: FormBuilder, private dialog: MatDialog, private service: TotalsCollectionService, private dashboard: DashboardService,
    private snackbar: SnackbarService, private Snackbar: MatSnackBar
  ) { 
    this.currentDate = this.getCurrentDate()

  }



  addCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "65%"
    dialogConfig.data = {
      test: ""
    }
    const dialogRef = this.dialog.open(AddTotalsCollectionsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCurrentDate(): any {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }


  onSelectionChange() {
    switch (this.selected) {
      case 'current_date':
        this.getTodaysData(); 
        break;
      case 'all':
        this.getData();
        break;
      default:
        this.form.patchValue({
          collectorId: '',
          accumulatorId: '',
          date: '',
        });
        break;
    }
  }

  filterByDate() {
    this.date = this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd');
    this.isLoading = true;
    this.getDateSummary(this.date)

    this.service.getAllCollectorByNames().subscribe(response => {
      const collectors = response.entity;
      const collectorIdToUsername = {};
      collectors.forEach(collector => {
        collectorIdToUsername[collector.id] = collector.username;
      });
      this.service.getAllRouteNames().subscribe ( response => {
        const routes = response.entity;
        const routeIdToName = {};
        routes.forEach(route => {
          routeIdToName[route.id] = route.route;
        });
        const roleName = 'TOTALS_COLLECTOR';

        this.service.getAllAccumulatorNames(roleName).subscribe(response => {
          const accumulators = response.userData;
          const accumulatorIdToName = {};
          accumulators.forEach(accumulator => {
            accumulatorIdToName[accumulator.id] = accumulator.username;
          });
    this.subscription = this.service.getTotalsCollectionByDate(this.date).subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        this.datasize=this.data.entity.length

        this.data.entity.forEach(item => {
          const itemCollectorId = item.collectorId;
          if (collectorIdToUsername.hasOwnProperty(itemCollectorId)) {
            item.collectorUsername = collectorIdToUsername[itemCollectorId];
          }
          const routeId = item.routeFk;
          if (routeIdToName.hasOwnProperty(routeId)) {
            item.routeName = routeIdToName[routeId];
          }
          const accumulatorId = item.accumulatorId;
          if (accumulatorIdToName.hasOwnProperty(accumulatorId)) {
            item.accumulatorName = accumulatorIdToName[accumulatorId];
          }
        });
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     
      }
      else {
        this.isdata = false;
        this.isLoading=false;
        this.dataSource = new MatTableDataSource(null);
      }
      this.selected=""
      },(error) => {
        console.log(error);
        this.isLoading = false;
        this.isdata = false;
        this.dataSource = new MatTableDataSource(null);
        this.selected = "";
        this.Snackbar.open(error, 'Close', {
          duration: 3000, 
        });
      }
      );

      if (this.selected == "current_date") {
      this.getTodaysData()
    }
    });
    });
    });
  }
  getData() {
    this.isLoading = true;
    this.getAllCollectionsSummary()

      this.service.getAllCollectorByNames().subscribe ( response => {
      const collectors = response.entity;
      const collectorIdToUsername = {};
      collectors.forEach(collector => {
        collectorIdToUsername[collector.id] = collector.username;
      });
      this.service.getAllRouteNames().subscribe ( response => {
        const routes = response.entity;
        const routeIdToName = {};
        routes.forEach(route => {
          routeIdToName[route.id] = route.route;
        });
        const roleName = 'TOTALS_COLLECTOR';

        this.service.getAllAccumulatorNames(roleName).subscribe(response => {
          const accumulators = response.userData;
          const accumulatorIdToName = {};
          accumulators.forEach(accumulator => {
            accumulatorIdToName[accumulator.id] = accumulator.username;
          });

      this.subscription = this.service.getAllAccumulations().subscribe(res => {
        this.data = res;

        if (this.data.entity.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.datasize = this.data.entity.length;

          this.data.entity.forEach(item => {
            const collectorId = item.collectorId;
            if (collectorIdToUsername.hasOwnProperty(collectorId)) {
              item.collectorUsername = collectorIdToUsername[collectorId];
            }
            const routeId = item.routeFk;
              if (routeIdToName.hasOwnProperty(routeId)) {
                item.routeName = routeIdToName[routeId];
              }
              const accumulatorId = item.accumulatorId;
              if (accumulatorIdToName.hasOwnProperty(accumulatorId)) {
                item.accumulatorName = accumulatorIdToName[accumulatorId];
              }
          });

          this.dataSource = new MatTableDataSource(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource(null);
          // this.resetFilter();

        }
        this.selected=""
      });
    });
    });
    });
  }



  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };



  ngOnInit(): void {
    this.selected = 'current_date'
    this.form = this.fb.group({
    collectorId: [""],
     accumulatorId: [""],
     date: [''],

    });
    this.smallChart2()
    this.getTodaysData();
  }
 
  // selectCollector() {
  //   // this.getSummaryPerCollector(collectorId)

  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "40%";
  //   dialogConfig.data = {
  //     user: '',
  //   };
  //   const dialogRef = this.dialog.open(CollectorsLookupsComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.dialogData = result;
  //     this.form.patchValue({
  //       collectorId: result.data.id, 
  //     });
     
  
  //   });
  // }

  selectCollector() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
  
    const dialogRef = this.dialog.open(CollectorsLookupsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;

        this.form.patchValue({
          collectorId: result.data.id,
        });
          this.service.getAllCollectorByNames().subscribe(response => {
          const collectors = response.entity;
          const collectorIdToUsername = {};
          collectors.forEach(collector => {
            collectorIdToUsername[collector.id] = collector.username;
          });
  
          this.service.getAllRouteNames().subscribe(response => {
            const routes = response.entity;
            const routeIdToName = {};
            routes.forEach(route => {
              routeIdToName[route.id] = route.route;
            });
  
            const roleName = 'TOTALS_COLLECTOR';

            this.service.getAllAccumulatorNames(roleName).subscribe(response => {
              const accumulators = response.userData;
              const accumulatorIdToName = {};
              accumulators.forEach(accumulator => {
                accumulatorIdToName[accumulator.id] = accumulator.username;
              });
  
              this.subscription = this.service.getCollectorsIdAccumulations(result.data.id).subscribe(res => {
                this.data = res;
  
                if (this.data.entity.length > 0) {
                  this.isLoading = false;
                  this.isdata = true;
                  this.datasize = this.data.entity.length;
  
                  this.data.entity.forEach(item => {
                    const itemCollectorId = item.collectorId;
                    if (collectorIdToUsername.hasOwnProperty(itemCollectorId)) {
                      item.collectorUsername = collectorIdToUsername[itemCollectorId];
                    }
                    const routeId = item.routeFk;
                    if (routeIdToName.hasOwnProperty(routeId)) {
                      item.routeName = routeIdToName[routeId];
                    }
                    const accumulatorId = item.accumulatorId;
                    if (accumulatorIdToName.hasOwnProperty(accumulatorId)) {
                      item.accumulatorName = accumulatorIdToName[accumulatorId];
                    }
                  });
  
                  this.dataSource = new MatTableDataSource(this.data.entity);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.getSummaryPerCollector(result.data.id);

                } else {
                  this.isdata = false;
                  this.dataSource = new MatTableDataSource(null);
                }
                
                this.selected = "";
                this.form.patchValue({ accumulatorId: "" });
              },
              (error) => {
                console.log(error);
                this.isLoading = false;
                this.isdata = false;
                this.dataSource = new MatTableDataSource(null);
                this.selected = "";
                this.form.patchValue({ collectorId: "" });

                this.Snackbar.open(error, 'Close', {
                  duration: 3000, 
                });
                
              });
            });
          });
        });
      }
    });
  }
  
  // filterByCollectorId(Id: any) {
  //   let collectorId = this.form.value.collectorId;
  //   // const collectorId = this.form.value.collectorId;

  
  //   if (collectorId != null && collectorId != undefined) {
  //     this.isLoading = true;
  //     this.getSummaryPerCollector(collectorId)
  
  //     this.service.getAllCollectorByNames().subscribe(response => {
  //       const collectors = response.entity; 
  //       const collectorIdToUsername = {};
  //       collectors.forEach(collector => {
  //         collectorIdToUsername[collector.id] = collector.username;
  //       });
  //       this.service.getAllRouteNames().subscribe ( response => {
  //         const routes = response.entity;
  //         const routeIdToName = {};
  //         routes.forEach(route => {
  //           routeIdToName[route.id] = route.route;
  //         });
  //         const roleName = 'TOTALS_COLLECTOR';
  
  //         this.service.getAllAccumulatorNames(roleName).subscribe(response => {
  //           const accumulators = response.userData;
  //           const accumulatorIdToName = {};
  //           accumulators.forEach(accumulator => {
  //             accumulatorIdToName[accumulator.id] = accumulator.username;
  //           });
  
  //       this.subscription = this.service.getCollectorsIdAccumulations(collectorId).subscribe(res => {
  //         this.data = res;
  
  //         if (this.data.entity.length > 0) {
  //           this.isLoading = false;
  //           this.isdata = true;
  //           this.datasize = this.data.entity.length;
  
  //           this.data.entity.forEach(item => {
  //             const itemCollectorId = item.collectorId;
              
  //             if (collectorIdToUsername.hasOwnProperty(itemCollectorId)) {
  //               item.collectorUsername = collectorIdToUsername[itemCollectorId];
  //             }
  //             const routeId = item.routeFk;
  //             if (routeIdToName.hasOwnProperty(routeId)) {
  //               item.routeName = routeIdToName[routeId];
  //             }
  //             const accumulatorId = item.accumulatorId;
  //             if (accumulatorIdToName.hasOwnProperty(accumulatorId)) {
  //               item.accumulatorName = accumulatorIdToName[accumulatorId];
  //             }
  //           });
            
  
  //           this.dataSource = new MatTableDataSource(this.data.entity);
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         } else {
  //           this.isdata = false;
  //           this.dataSource = new MatTableDataSource(null);
            
  //           // this.resetFilter();

  //         }
  //         this.selected="";
  //         this.filterform.patchValue({ farmer_no: "" });
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.isLoading = false;
  //         this.isdata = false;
  //         this.dataSource = new MatTableDataSource(null);
  //         this.selected = "";
  //         this.filterform.patchValue({ collectorId: "" }); 
        
  //       });
  //     });
  //   });
  //     });
  //   }
  // }
  
  
  
  getSummaryPerCollector(collectorId) {
    
    this.isLoading = true;
    this.milkQuantity = 0;
    this.damount = 0;
    this.subscription = this.dashboard.getCollectorsIdAccumulations(collectorId).subscribe(res => {
      this.data = res;
      if (this.data && this.data.entity.length > 0) {
        this.isLoading = false;
                let totalMilkQuantity = 0;
        let totalAmount = 0;
          for (const entity of this.data.entity) {
          totalMilkQuantity += entity.milkQuantity;
          totalAmount += entity.amount;
        }
          this.milkQuantity = totalMilkQuantity;
        this.damount = totalAmount;
      }
    });
  }


  filterByAccumulatorId(Id: any) {
    let accumulatorId = this.form.value.accumulatorId;

    if (accumulatorId != null && accumulatorId != undefined) {
      this.isLoading = true;
      this.getSummaryPerAccumulator(accumulatorId)

        this.service.getAllCollectorByNames().subscribe(response => {
        const collectors = response.entity;
        const collectorIdToUsername = {};
        collectors.forEach(collector => {
          collectorIdToUsername[collector.id] = collector.username;
        });
        this.service.getAllRouteNames().subscribe ( response => {
          const routes = response.entity;
          const routeIdToName = {};
          routes.forEach(route => {
            routeIdToName[route.id] = route.route;
          });
          const roleName = 'TOTALS_COLLECTOR';

          this.service.getAllAccumulatorNames(roleName).subscribe(response => {
            const accumulators = response.userData;
            const accumulatorIdToName = {};
            accumulators.forEach(accumulator => {
              accumulatorIdToName[accumulator.id] = accumulator.username;
            });

        this.subscription = this.service.getAccumulationsByAccumulatorId(accumulatorId).subscribe(res => {
          this.data = res;

          if (this.data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            this.datasize = this.data.entity.length;

            this.data.entity.forEach(item => {
              const itemCollectorId = item.collectorId;
              if (collectorIdToUsername.hasOwnProperty(itemCollectorId)) {
                item.collectorUsername = collectorIdToUsername[itemCollectorId];
              }
              const routeId = item.routeFk;
              if (routeIdToName.hasOwnProperty(routeId)) {
                item.routeName = routeIdToName[routeId];
              }
              const accumulatorId = item.accumulatorId;
              if (accumulatorIdToName.hasOwnProperty(accumulatorId)) {
                item.accumulatorName = accumulatorIdToName[accumulatorId];
              }
            });

            this.dataSource = new MatTableDataSource(this.data.entity);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isdata = false;
            this.dataSource = new MatTableDataSource(null);
          }
          this.selected="";
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.isdata = false;
          this.dataSource = new MatTableDataSource(null);
          this.selected="";
          this.Snackbar.open(error, 'Close', {
            duration: 3000, 
          });
        
        });
      });
    });
      });
    }
  }
  getTodaysData() {
    this.isLoading = true;
    const currentDate = this.getCurrentDate();
     this.getDateSummary(this.currentDate)
     this.service.getAllCollectorByNames().subscribe(response => {
     const collectors = response.entity;
     const collectorIdToUsername = {};
     collectors.forEach(collector => {
       collectorIdToUsername[collector.id] = collector.username;
     });
     this.service.getAllRouteNames().subscribe ( response => {
       const routes = response.entity;
       const routeIdToName = {};
       routes.forEach(route => {
         routeIdToName[route.id] = route.route;
       });
       const roleName = 'TOTALS_COLLECTOR';

       this.service.getAllAccumulatorNames(roleName).subscribe(response => {
         const accumulators = response.userData;
         const accumulatorIdToName = {};
         accumulators.forEach(accumulator => {
           accumulatorIdToName[accumulator.id] = accumulator.username;
         });
      this.subscription = this.service.getTotalsCollectionByDate(currentDate).subscribe(res => {
      this.data = res;
      if (this.data.entity && this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        this.datasize=this.data.entity.length
        this.data.entity.forEach(item => {
          const itemCollectorId = item.collectorId;
          if (collectorIdToUsername.hasOwnProperty(itemCollectorId)) {
            item.collectorUsername = collectorIdToUsername[itemCollectorId];
          }
          const routeId = item.routeFk;
          if (routeIdToName.hasOwnProperty(routeId)) {
            item.routeName = routeIdToName[routeId];
          }
          const accumulatorId = item.accumulatorId;
          if (accumulatorIdToName.hasOwnProperty(accumulatorId)) {
            item.accumulatorName = accumulatorIdToName[accumulatorId];
          }
        });
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.isLoading = false
        this.dataSource = new MatTableDataSource(null);
      }
      this.selected="";
    },(error) => {
      console.log(error);
      this.isLoading = false;
      this.isdata = false;
      this.dataSource = new MatTableDataSource(null);
      this.selected="";
      this.Snackbar.open(error, 'Close', {
        duration: 3000, 
      });
    
    });
  });
});
  });
}

  getSummaryPerAccumulator(accumulatorId) {
    this.isLoading = true;
    this.milkQuantity = 0;
    this.damount = 0;
    this.subscription = this.dashboard.getAccumulationsByAccumulatorId(accumulatorId).subscribe(res => {
      this.data = res;
      if (this.data && this.data.entity.length > 0) {
        this.isLoading = false;
          let totalMilkQuantity = 0;
        let totalAmount = 0;
          for (const entity of this.data.entity) {
          totalMilkQuantity += entity.milkQuantity;
          totalAmount += entity.amount;
        }

        this.milkQuantity = totalMilkQuantity;
        this.damount = totalAmount;
      }
    },(err)=>console.log(err));
  }
  getDateSummary(date) {
    this.isLoading = true;
    this.milkQuantity = 0;
      this.damount = 0;
    this.subscription = this.dashboard.getTotalsCollectionByDate(date).subscribe(res => {
      this.data = res;
      if (this.data && this.data.entity.length > 0) {
        this.isLoading = false;
            let totalMilkQuantity = 0;
        let totalAmount = 0;
            for (const entity of this.data.entity) {
          totalMilkQuantity += entity.milkQuantity;
          totalAmount += entity.amount;
        }
            this.milkQuantity = totalMilkQuantity;
        this.damount = totalAmount;
      }
    });
  }

    getAllCollectionsSummary() {
      this.isLoading = true;
      this.milkQuantity = 0;
      this.damount = 0;
      this.subscription = this.dashboard.getAllAccumulations().subscribe(res => {
        this.data = res;
        if (this.data && this.data.entity.length > 0) {
          this.isLoading = false;
              let totalMilkQuantity = 0;
          let totalAmount = 0;
              for (const entity of this.data.entity) {
            totalMilkQuantity += entity.milkQuantity;
            totalAmount += entity.amount;
          }
              this.milkQuantity = totalMilkQuantity;
          this.damount = totalAmount;
        }
      });
    }
    private smallChart2() {
      this.cardChart2 = {
        responsive: true,
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
        title: {
          display: false,
        },
      };
      this.cardChart2Data = [
        {
          label: "New Clients",
          data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
          borderWidth: 4,
          pointStyle: "circle",
          pointRadius: 4,
          borderColor: "rgba(253,126,20,.7)",
          pointBackgroundColor: "rgba(253,126,20,.2)",
          backgroundColor: "rgba(253,126,20,.2)",
          pointBorderColor: "transparent",
        },
      ];
      this.cardChart2Label = [
        "16-07-2018",
        "17-07-2018",
        "18-07-2018",
        "19-07-2018",
        "20-07-2018",
        "21-07-2018",
        "22-07-2018",
        "23-07-2018",
        "24-07-2018",
        "25-07-2018",
        "26-07-2018",
        "27-07-2018",
        "28-07-2018",
        "29-07-2018",
        "30-07-2018",
        "31-07-2018",
      ];
    }
}
