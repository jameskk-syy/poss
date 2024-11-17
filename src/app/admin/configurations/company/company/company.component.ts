import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { ConfigurationsService } from '../../configurations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {

  loading: boolean
  company: any;
  isdata: boolean;
  isloading: boolean;
  subscription!: Subscription;


  constructor(
    private dialog: MatDialog,
    private configurationService: ConfigurationsService
  ) { }

  ngOnInit(): void {
  }

  getCompanyData(){
    this.loading = true;
    this.subscription = this.configurationService.getCompanies().subscribe({
      next:(res) =>{
        if (res && res.length > 0) {
          this.company = res;
          this.isdata = true;
        }
        else {
          this.isdata = false
        }
        this.isloading = false
      },
      error: (err) => {
        this.isloading = false;
        console.error('Error fetching stock data:', err);
        this.isdata = false;
      }
    })
  }


  addCompany(action:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = { 
      action:action
    }
    console.log('action is',action)
  

    const dialogRef = this.dialog.open(AddCompanyComponent, dialogConfig);
      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
    }


  editCompany(action:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = { 
      action:action,
      company: {
        name: 'Rubis Kamakis',
        address: '123 Street',
        phone: '123-456-7890',
        email: 'example@company.com',
        registrationNo: '12345',
        kraPin: 'KRA123'
      }
    }
    console.log('action is ',action)
  

    const dialogRef = this.dialog.open(AddCompanyComponent, dialogConfig);
      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
  }
}
