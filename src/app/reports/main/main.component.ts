import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerLookupComponent } from 'src/app/staff/farmer/pages/farmer-lookup/farmer-lookup.component';
import { FarmerStatementComponent } from '../farmer-statement/farmer-statement.component';
import { ReportsService } from '../services/reports.service';
import { StatmentComponent } from '../pages/statment/statment.component';
import { FarmerProductsReportComponent } from '../pages/farmer-products-report/farmer-products-report.component';
import { LookupPickUpLocationsComponent } from 'src/app/staff/sales/pages/lookup-pick-up-locations/lookup-pick-up-locations.component';
import { saveAs } from 'file-saver';
import { RoutesLookUpComponent } from 'src/app/staff/sales/pages/routes-look-up/routes-look-up.component';
import { loadavg } from 'os';
const YEARS = [
  {value: '2024', name: '2024'},
  {value: '2025', name: '2025'},
  {value: '2026', name: '2026'},
  {value: '2027', name: '2027'},
  {value: '2028', name: '2028'},
  {value: '2029', name: '2029'},
  {value: '2030', name: '2030'},
  {value: '2031', name: '2031'},
];
const MONTHS = [
  { value: 1, name: 'JANUARY' },
  { value: 2, name: 'FEBRUARY' },
  { value: 3, name: 'MARCH' },
  { value: 4, name: 'APRIL' },
  { value: 5, name: 'MAY' },
  { value: 6, name: 'JUNE' },
  { value: 7, name: 'JULY' },
  { value: 8, name: 'AUGUST' },
  { value: 9, name: 'SEPTEMBER' },
  { value: 10, name: 'OCTOBER' },
  { value: 11, name: 'NOVEMBER' },
  { value: 12, name: 'DECEMBER' }
];

const Banks = {
  count: 45,
  list: [
    {
      name: "MPESA",
      code: "3",
      payPointType: "MPESA",
      status: 'ACTIVE',
      id: 7
    },
    {
      name: 'COOPERATIVE BANK',
      code: '35',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 607,
    },
    {
      name: 'KCB BANK',
      code: '19',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 608,
    },
    {
      name: 'ABSA',
      code: '3',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 611,
    },
    {
      name: 'BINGWA SACCO',
      code: '64',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 613,
    },
    {
      name: 'FORTUNE SACCO',
      code: '30',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 614,
    },
    {
      name: 'OLLIN SACCO',
      code: '16',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 615,
    },
    {
      name: 'GOODWAY SACCO',
      code: '11',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 616,
    },
    {
      name: 'EQUITY BANK',
      code: '68',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 649,
    },
    {
      name: 'FAMILY BANK LTD',
      code: '70',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 625,
    },
    {
      name: 'MWIKURE SACCO',
      code: '15',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 628,
    },
    {
      name: 'SIDIAN BANK',
      code: '66',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 637,
    },
    {
      name: 'STANBIC BANK KENYA LIMITED',
      code: '31',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 644,
    },
    {
      name: 'STANDARD CHARTERED',
      code: '2',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 645,
    },
    {
      name: 'VICTORIA COMMERCIAL BANK LTD',
      code: '54',
      payPointType: 'BANK',
      status: 'ACTIVE',
      id: 648,
    },
  ],
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  reportCollectionForm: FormGroup;
  farmerstatementForm: FormGroup
  collectionPerpLocationsForm: FormGroup
  dailyCollectionReportForm: FormGroup
  reportFarmerForm: FormGroup
  reportCollectionForm2: FormGroup
  reportCollectionForm3: FormGroup
  reportCollectionFormp:FormGroup
  paymentFileForm1:FormGroup
  paymentFileForm2:FormGroup
  reportCollectionForm5: FormGroup;
  CollectionCountReportForm: FormGroup
  reportCollectionFormm:FormGroup
  reportCollectionForm1:FormGroup
  payrollForm: FormGroup
  routeSummaryPerMonth: FormGroup
  
  isloading: boolean
  collectors: any
  months: any
  years: any
  centered = false;
  color: string;
  currentYear: any
  banks: any

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dialogData: any;
  date: string;
  route: any;


  constructor(
    // public dialogRef: MatDialogRef<MainComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private snackbar: SnackbarService,
    private service: ReportsService,
  ) { }

  ngOnInit(): void {
    this.banks = Banks.list
    this.currentYear = new Date().getFullYear().toString()
    this.reportCollectionForm = this.fb.group({
      date: ["", [Validators.required]],
      format: ["", [Validators.required]],
      })
    this.CollectionCountReportForm=this.fb.group({
      month: ["", [Validators.required]],
      year: ["", [Validators.required]],

    })
    this.dailyCollectionReportForm=this.fb.group({
      month: ["", [Validators.required]],
      year: ["", [Validators.required]],


    })
    this.reportFarmerForm=this.fb.group({
      month: ["", [Validators.required]],
      route: ["", [Validators.required]],
    })
    this.reportCollectionForm2 = this.fb.group({
      date: ["", [Validators.required]],
    })
    this.reportCollectionForm1 = this.fb.group({
      year: ["", [Validators.required]],
      month: ["", [Validators.required]],    
    })
    this.reportCollectionForm5 = this.fb.group({
      date: ["", [Validators.required]],
      
    
    })
    
    this.reportCollectionForm3 = this.fb.group({
      date: ["", [Validators.required]],
      route: ["", [Validators.required]],
    
    })
    this.reportCollectionFormp = this.fb.group({

      date: ["", [Validators.required]],
      // format: ["", [Validators.required]],
    
    })
    this.reportCollectionFormm = this.fb.group({

      month: ["", [Validators.required]],
      year: ["", [Validators.required]],
    
    })

    this.collectionPerpLocationsForm = this.fb.group({
      date: ["", [Validators.required]],
      format: ["", [Validators.required]],
      pul: ["", [Validators.required]],
      locationId: ["", [Validators.required]],
    })

    this.routeSummaryPerMonth = this.fb.group({
      route: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: [this.currentYear, [Validators.required]]
    })


    this.months = MONTHS
    this.years = YEARS

    // this.paymentFileForm = this.fb.group(
    //   {
    //     month: ["", [Validators.required]],
    //     mode: ["", [Validators.required]],
    //     pul: ["", [Validators.required]],
    //     locationId: ["", [Validators.required]],
    //   }
    // )
    this.paymentFileForm1=this.fb.group({
      month: ["", [Validators.required]],
      year: [this.currentYear, Validators.required],
      channel: ['', [Validators.required]],
      format: ['', [Validators.required]]
    })
    this.paymentFileForm2=this.fb.group({
      month: ["", [Validators.required]]
    })
    this.payrollForm = this.fb.group({
      month: ['', [Validators.required]],
      year: [this.currentYear, [Validators.required]],
      format: ['', [Validators.required]]
    })

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
      this.dialogData = result;

      this.reportFarmerForm.patchValue({
        route: this.dialogData.data.route
      });
      this.reportCollectionForm3.patchValue({
        route: this.dialogData.data.route
      });

      this.routeSummaryPerMonth.get('route').setValue(this.dialogData.data.route)


      
      // this.generateCollectionsPerFarmerPerRoute()

    });
  }
  generateDateReport() {
    // this.color="green"
    // this.centered=true
    this.isloading = true
    let format = this.reportCollectionForm.value.format
    this.date = this.datePipe.transform(this.reportCollectionForm.value.date, 'yyyy-MM-dd');
    if (format == "pdf") {

      this.service.collectionsPerDate(this.date)
        .subscribe(
          (response) => {
            console.log(response)
            let url = window.URL.createObjectURL(response.data);

            // if you want to open PDF in new tab
            window.open(url);

            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.setAttribute("target", "blank");
            a.href = url;
            a.download = response.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            this.isloading = false;


            this.snackbar.showNotification(
              "snackbar-success",
              "Report generated successfully",
            );
          },
          (err) => {
            console.log(err);
            this.isloading = false

            this.snackbar.showNotification(
              "snackbar-danger",
              "Report could not be generated successfully",
            );
          }
        );
    } else if (format == "excel") {
      console.log("File format picked = " + format)
      console.log("Formated Date = " + this.date)
      this.service.collectionsPerDateExcel(this.date).subscribe(
        (response: Blob) => {
          this.isloading = false
          const filename = 'collections_per_date.xlsx'; // Specify the desired filename with the appropriate extension
          saveAs(response, filename);
        },
        error => {
          console.error('Failed to download report:', error);
        }
      );
    }

  }
  generateCollectionCount(){
    this.isloading = true
    this.service.collectionsCountPerDayPerMonth(this.CollectionCountReportForm.value.month,this.CollectionCountReportForm.value.year)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );

  }
  generateCollectionsPerDayPerMonth(){
    this.isloading = true
    this.service.collectionsPerDayPerMonth(this.dailyCollectionReportForm.value.month,this.dailyCollectionReportForm.value.year)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );

  }

  generateCollectionsPerFarmerPerRoute(){
    this.isloading = true
    this.service.collectionsPerFarmerPerDatePerRoute(this.reportFarmerForm.value.month,this.reportFarmerForm.value.route)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download =response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully",
          );
        }
      );
  }

  dailyRouteSummary() {
    this.date = this.datePipe.transform(this.reportCollectionForm2.value.date, 'yyyy-MM-dd');
    this.isloading = true
    this.service.dailyRouteSummary(this.date)
      .subscribe(
        (response) => {
          console.log(response)
          let url = window.URL.createObjectURL(response.data);

          console.log(url)
          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download =response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully",
          );
        }
      );

  }
  monthlyRouteSummary() {
    this.isloading = true
    this.service.monthlyRouteSummary(this.reportCollectionForm1.value.year,this.reportCollectionForm1.value.month)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );

  }
  generateCollectionsPerRoutePerDate(){
    this.date = this.datePipe.transform(this.reportCollectionForm5.value.date, 'yyyy-MM-dd');
    this.isloading = true
    this.service.dailyRouteCollectionsByDate(this.reportCollectionForm5.value.date)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );

  }

  generateCollectionsForRoutePerDate() {
    this.date = this.datePipe.transform(this.reportCollectionForm3.value.date, 'yyyy-MM-dd');
    this.isloading = true
    this.service.collectionsPerRouteByDate(this.reportCollectionForm3.value.date,this.reportCollectionForm3.value.route)
      .subscribe(
        (response) => {
          let url = window.URL.createObjectURL(response.data);

          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );

  }
  // generateCollectionsPerLocationsp() {
  //   // console.log(this.reportCollectionForm.value)
  //   this.date = this.datePipe.transform(this.reportCollectionFormp.value.date, 'yyyy-MM-dd');
  //   console.log("Formated date is ", this.date)
  //   this.isloading = true
  //   this.service.collectionsPerLocationrByDatep(this.date)
  //     .subscribe(
  //       (response) => {
  //         console.log(response)
  //         let url = window.URL.createObjectURL(response.data);

  //         // if you want to open PDF in new tab
  //         window.open(url);

  //         let a = document.createElement("a");
  //         document.body.appendChild(a);
  //         a.setAttribute("style", "display: none");
  //         a.setAttribute("target", "blank");
  //         a.href = url;
  //         a.download = response.filename;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         a.remove();

  //         this.isloading = false;



  //         this.snackbar.showNotification(
  //           "Report generated successfully",
  //           "snackbar-success"
  //         );
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.isloading = false

  //         this.snackbar.showNotification(
  //           "Report could not be generated successfully",
  //           "snackbar-danger"
  //         );
  //       }
  //     );

  // }
  generateCollectionsPerRoutePerMonth() {
    
    
    this.isloading = true
    this.service.collectionsPerRouteByMonth(this.reportCollectionFormm.value.month, this.reportCollectionFormm.value.year)
      .subscribe(
        (response) => {
          console.log(response)
          let url = window.URL.createObjectURL(response.data);

          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );

  }

  // selectPickUpLocation() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "40%";
  //   dialogConfig.data = {
  //     user: '',
  //   };
  //   const dialogRef = this.dialog.open(LookupPickUpLocationsComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.dialogData = result;
  //     this.collectionPerpLocationsForm.patchValue({
  //       pul: this.dialogData.data.name,
  //       locationId: this.dialogData.data.id
  //     });
  //   });
  // }
  // choosePickUpLocation() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "40%";
  //   dialogConfig.data = {
  //     user: '',
  //   };
  //   const dialogRef = this.dialog.open(LookupPickUpLocationsComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.dialogData = result;
  //     this.paymentFileForm.patchValue({
  //       pul: this.dialogData.data.name,
  //       locationId: this.dialogData.data.id
  //     });
  //   });
  // }

  
  // generatePaymentFile() {
  //   console.log("Paymentfile Form Data"+ this.paymentFileForm.value.pul)
  //   console.log("Paymentfile Form Data"+ this.paymentFileForm.value.locationId)
  //   this.isloading = true
  //   this.service.getPaymentFile(this.paymentFileForm.value.locationId,this.paymentFileForm.value.month, this.paymentFileForm.value.mode)
  //     .subscribe(
  //       (response) => {
  //         console.log(response)
  //         let url = window.URL.createObjectURL(response.data);

  //         window.open(url);

  //         let a = document.createElement("a");
  //         document.body.appendChild(a);
  //         a.setAttribute("style", "display: none");
  //         a.setAttribute("target", "blank");
  //         a.href = url;
  //         a.download = response.filename;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         a.remove();

  //         this.isloading = false;



  //         this.snackbar.showNotification(
  //           "Report generated successfully",
  //           "snackbar-success"
  //         );
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.isloading = false

  //         this.snackbar.showNotification(
  //           "Report could not be generated successfully",
  //           "snackbar-danger"
  //         );
  //       }
  //     );

  // }

  getFullPayroll() {
    const reportname = `payroll-`+this.paymentFileForm1.value.month+`-`+this.paymentFileForm1.value.year+`-`
    this.isloading = true;

    if (this.payrollForm.value.format === 'excel') {
      this.service.getFullExcelPayroll(this.payrollForm.value.month, this.payrollForm.value.year).subscribe({
        next: (res: Blob) => {
          this.isloading = false;
          const filename = reportname+'.xlsx'
          saveAs(res, filename)

          this.snackbar.showNotification('snackbar-success', "payroll generated successfully")
        },
        error: (err) => {
          this.isloading = false;
          console.log(err)
          this.snackbar.showNotification('snackbar-danger', "unable to generate payroll")
        }
      })
    } else {
      this.service.getFullPdfPayroll(this.payrollForm.value.month, this.payrollForm.value.year).subscribe({
        next: (res: any) => {
          let url = window.URL.createObjectURL(res.data);

          // if you want to open PDF in new tab
          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
        },
        error: (err) => {
          this.isloading = false
          console.log(err)

          this.snackbar.showNotification('snackbar-danger', "unable to get payroll")
        },
        complete: () => {}
      })
    }
  }

  generatePayroll(){
    this.isloading = true
    const reportname = `payroll-`+this.paymentFileForm1.value.month+`-`+this.paymentFileForm1.value.year+`-`+this.paymentFileForm1.value.channel

    if (this.paymentFileForm1.value.format=="excel") {
      this.service.getPayroll(this.paymentFileForm1.value.month, this.paymentFileForm1.value.year, this.paymentFileForm1.value.channel)
      .subscribe({
        next: (response: Blob) => {
          this.isloading = false
          const filename = reportname+'.xlsx'; // Specify the desired filename with the appropriate extension
          saveAs(response, filename);

          this.isloading = false;

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully"          
          );
        },
        error: (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "snackbar-danger",
            "Report could not be generated successfully",
          );
        }
    });
    } else {
      this.service.getPayrollByMode(this.paymentFileForm1.value.month, this.paymentFileForm1.value.year, this.paymentFileForm1.value.channel).subscribe({
        next: (response: any) => {
          console.log("filename is ", response.filename)
          console.log("file is ", response.data)
          let url = window.URL.createObjectURL(response.data);

          // if you want to open PDF in new tab
          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;

          this.snackbar.showNotification(
            "snackbar-success",
            "Report generated successfully",
          );
        },
        error: (err) => {
          console.log("error caught is ", err);
          this.isloading = false;
          this.snackbar.showNotification("snackbar-danger", "failed to fetch report")
        }
      })
    }
  }

  dailyRouteSummaryPerMonth() {
    this.isloading = true
    this.service.dailyRouteSummaryPerMonth(this.routeSummaryPerMonth.value.route, this.routeSummaryPerMonth.value.month, this.routeSummaryPerMonth.value.year).subscribe({
      next: (res: any) => {
        let url = window.URL.createObjectURL(res.data);

        // if you want to open PDF in new tab
        window.open(url);

        let a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.setAttribute("target", "blank");
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        this.isloading = false;

        this.snackbar.showNotification(
          "snackbar-success",
          "Report generated successfully",
        );
      },
      error: (err) => {
        this.isloading = false
        console.log(err)

        this.snackbar.showNotification('snackbar-danger', "unable to get report")
      },
      complete: () => {}
    })
  }

  generateMpesaPaymentFile(){
    this.isloading = true
    this.service.getMpesaPaymentFile(this.paymentFileForm2.value.month)
      .subscribe(
        (response) => {
          console.log(response)
          let url = window.URL.createObjectURL(response.data);

          // if you want to open PDF in new tab
          window.open(url);

          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.setAttribute("target", "blank");
          a.href = url;
          a.download = response.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();

          this.isloading = false;



          this.snackbar.showNotification(
            "Report generated successfully",
            "snackbar-success"
          );
        },
        (err) => {
          console.log(err);
          this.isloading = false

          this.snackbar.showNotification(
            "Report could not be generated successfully",
            "snackbar-danger"
          );
        }
      );
  }
  // generateCollectionsPerPickUpLocations() {
  //   this.isloading = true
  //  let format=this.collectionPerpLocationsForm.value.format
  //   this.date = this.datePipe.transform(this.collectionPerpLocationsForm.value.date, 'yyyy-MM-dd');
  //   console.log("Formated date " + this.date)
  //   if(format=="pdf"){
  //   this.service.collectionsPerPulByDate(this.collectionPerpLocationsForm.value.locationId, this.date)
  //     .subscribe(
  //       (response) => {
  //         console.log(response)
  //         let url = window.URL.createObjectURL(response.data);

  //         // if you want to open PDF in new tab
  //         window.open(url);

  //         let a = document.createElement("a");
  //         document.body.appendChild(a);
  //         a.setAttribute("style", "display: none");
  //         a.setAttribute("target", "blank");
  //         a.href = url;
  //         a.download = response.filename;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         a.remove();

  //         this.isloading = false;



  //         this.snackbar.showNotification(
  //           "Report generated successfully",
  //           "snackbar-success"
  //         );
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.isloading = false

  //         this.snackbar.showNotification(
  //           "Report could not be generated successfully",
  //           "snackbar-danger"
  //         );
  //       }
  //     );
  //     }else if (format == "excel") {
  //       console.log("File format picked = " + format)
  //       console.log("Formated Date = " + this.date)
  //       this.service.collectionsPerMCCandDateExcel(this.collectionPerpLocationsForm.value.locationId,this.date).subscribe(
  //         (response: Blob) => {
  //           this.isloading = false
  //           const filename = 'collections_per_date.xlsx'; // Specify the desired filename with the appropriate extension
  //           saveAs(response, filename);
  //         },
  //         error => {
  //           console.error('Failed to download report:', error);
  //         }
  //       );
  //     }
  // }
  // generateTotalCollectionsPerPickUpLocations() {
  //   this.isloading = true
  //   console.log(this.collectionPerpLocationsForm.value)
  //   this.date = this.datePipe.transform(this.collectionPerpLocationsForm.value.date, 'yyyy-MM-dd');
  //   console.log("Formated date " + this.date)
  //   this.service.collectionsPerPulByDate(this.collectionPerpLocationsForm.value.locationId, this.date)
  //     .subscribe(
  //       (response) => {
  //         console.log(response)
  //         let url = window.URL.createObjectURL(response.data);

  //         // if you want to open PDF in new tab
  //         window.open(url);

  //         let a = document.createElement("a");
  //         document.body.appendChild(a);
  //         a.setAttribute("style", "display: none");
  //         a.setAttribute("target", "blank");
  //         a.href = url;
  //         a.download = response.filename;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         a.remove();

  //         this.isloading = false;



  //         this.snackbar.showNotification(
  //           "Report generated successfully",
  //           "snackbar-success"
  //         );
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.isloading = false

  //         this.snackbar.showNotification(
  //           "Report could not be generated successfully",
  //           "snackbar-danger"
  //         );
  //       }
  //     );
  // }




  farmerCollectionsReport() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      data: ""
    }
    this.dialog.open(FarmerStatementComponent, dialogConfig)


  }
  // farmerProductReport() {

  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "500px"
  //   dialogConfig.data = {
  //     data: ""
  //   }
  //   this.dialog.open(FarmerProductsReportComponent, dialogConfig)


  // }
  farmerStatement() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      data: ""
    }
    this.dialog.open(StatmentComponent, dialogConfig)


  }
  DailyCOllectionReport() {

  }
  collectionsPerFarmer(){

  }
  collectionsPerLocation(title: any) {

  }
  collectionsPerCollector(title: any) {

  }
  onClick() {

  }
}
