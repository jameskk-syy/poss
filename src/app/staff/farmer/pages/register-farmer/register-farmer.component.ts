import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CountiesService } from 'src/app/admin/counties/counties.service';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { FarmerService } from '../../services/farmer.service';
import { FarmerManagenentComponent } from '../farmer-managenent/farmer-managenent.component';
import { RoutesService } from 'src/app/admin/routes/routes.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-register-farmer',
  templateUrl: './register-farmer.component.html',
  styleUrls: ['./register-farmer.component.scss'],
})
export class RegisterFarmerComponent implements OnInit {
  farmerRegirstartionForm: FormGroup;
  bankDetailsForm: FormGroup;
  mpesaDetails: FormGroup;
  nextOfKinForm: FormGroup;
  loading = false;
  isLoading: Boolean;
  isdata: Boolean;
  subcounties: any[] = [];
  wards: any;
  counties: any;
  routes: any;
  userRole: any
  selectedPaymentMode: string = ''
  tiersA: string[] = ["STANDARD"];
  tiersB: string[] = ["STANDARD", "SPECIAL 1", "SPECIAL 2", "SPECIAL 3", "SPECIAL 4"]
  tiers: string[] = []
  relationships: string [] = ["WIFE", "MOTHER", "FATHER", "SISTER", "BROTHER", "UNCLE", "SON", "DAUGHTER"]

  banks: any = {
    count: 45,
    list: [
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
  method="BANK"
  constructor(
    public dialogRef: MatDialogRef<FarmerManagenentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private countiesService: CountiesService,
    private routesService: PickupService,
    private service: FarmerService,
    private routeService: RoutesService,
    private tokenStorage: TokenStorageService
  ) {}
  subscription!: Subscription;

  ngOnInit(): void {
    this.getSubcounties();
    this.getCounties();
    this.getRoutes();

    const user = this.tokenStorage.getUser();

    this.userRole = user.roles[0].name;

    if(this.userRole === Role.Admin) {
      this.tiers = this.tiersB
    } else {
      this.tiers = this.tiersA
    }

    this.bankDetailsForm = this.fb.group({
     
      branch: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
    });

    this.mpesaDetails = this.fb.group({
      mpesaNumber: ['', [Validators.required]],
      alternativeNumber: [''],
    });

    this.nextOfKinForm = this.fb.group({
      name:['', [Validators.required]],
      idNo:['', [Validators.required]],            
      relationship:['', [Validators.required]],            
      address:['', [Validators.required]],
      tel:['', [Validators.required]]    
    });

    this.farmerRegirstartionForm = this.fb.group({
      bankDetails: [''],
      transportMeans: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      subcounty_fk: [''],
      wardFk: [''],
      memberType: ['', [Validators.required]],
      alternativeMobileNo: [''],
      paymentMode:['',[Validators.required]],
      county_fk: [''],
      location: [''],
      subLocation: [''],
      village: [''],
      gender: [''],
      routeFk: [''],
      nextOfKin:['']
    });

    this.farmerRegirstartionForm.get('paymentMode').valueChanges.subscribe((value) => {
      this.selectedPaymentMode = value;
      // this.updateButtonState();
    })
  }

  onSubmit() {
    this.loading = true;
    this.farmerRegirstartionForm.value.bankDetails = this.bankDetailsForm.value;
    this.farmerRegirstartionForm.value.nextOfKin = this.nextOfKinForm.value;

    this.subscription = this.service
      .registerFarmer(this.farmerRegirstartionForm.value)
      .subscribe(
        (res: any) => {
          var details = res.entity;
          this.snackbar.showNotification('snackbar-success', 'F/No '+details.farmerNo+', name: '+details.username+ ' created!');
          this.loading = false;
          this.farmerRegirstartionForm.reset();
          this.dialogRef.close();
        },
        (err) => {
          this.loading = false;
          this.snackbar.showNotification('snackbar-danger', err);
          this.dialogRef.close();
        }
      );
  }

  onClick() {
    this.dialogRef.close();
  }

  getSubcounties() {
    this.isLoading = true;
    this.subscription = this.service.getSubCounties().subscribe((res) => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.subcounties = this.data.entity;
      } else {
        this.subcounties = [];
      }
    });
  }

  getCounties() {
    this.subscription = this.countiesService.getCounties().subscribe((res) => {
      if (res.entity.length > 0) {
        this.counties = res.entity;
      } else {
        this.counties = [];
      }
    });
  }

  // getPickUpLocations() {
  //   this.subscription = this.routesService.getLocations().subscribe((res) => {
  //     if (res.entity.length > 0) {
  //       this.routes = res.entity;
  //     } else {
  //       this.routes = [];
  //     }
  //   });
  // }

  getRoutes() {
    this.subscription = this.routeService.getRoutes().subscribe((res) => {
      if (res.entity.length > 0) {
        this.routes = res.entity;

      } else {
        this.routes = [];
      }
    });
  }

  getWards(id: any) {
    this.subscription = this.service
      .getSubCountyById(id.value)
      .subscribe((res) => {
        this.data = res;
        if (this.data.entity.wards.length > 0) {
          this.wards = this.data.entity.wards;
        } else {
        }
      });
  }

  updateButtonState() {
    if(this.selectedPaymentMode === 'SACCO' || this.selectedPaymentMode === "BANK") {
      this.farmerRegirstartionForm.get('bankDetails').setValidators([Validators.required]);
      this.farmerRegirstartionForm.get('bankDetails').updateValueAndValidity();
    } else {
      this.farmerRegirstartionForm.get('bankDetails').clearValidators();
      this.farmerRegirstartionForm.get('bankDetails').updateValueAndValidity();
    }

    if (this.selectedPaymentMode === 'MPESA') {
      this.farmerRegirstartionForm.get('mpesaDetails').setValidators([Validators.required]);
      this.farmerRegirstartionForm.get('mpesaDetails').updateValueAndValidity();
    } else {
      this.farmerRegirstartionForm.get('mpesaDetails').clearValidators();
      this.farmerRegirstartionForm.get('mpesaDetails').updateValueAndValidity();
    }
  }
}
