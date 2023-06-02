import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.sass']
})
export class ManageCustomersComponent implements OnInit {


  filterform:FormGroup
  dataSource!: MatTableDataSource<any>;
  selected = "";

  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;

  displayedColumns: string[] = [
    'id',
    "customerno",
    "firstName",
    "lastName",
    "contact",  
    "address",
    "status",
    'action',
  ];

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.filterform= this.fb.group({
      customer_no: [""],
    })
  }


  getData(){

  }

  addCall(){

  }

  filterCustomers(){

  }

  getCustomerByCustomerNo(){
    let farmerNo=this.filterform.value.farmer_no
  }

  editCall(){

  }

  deleteCall(){

  }

  viewFarmerDetails(){

  }

  viewFarmerCollections(){

  }

  farmerDetailsCall(){

  }

}
