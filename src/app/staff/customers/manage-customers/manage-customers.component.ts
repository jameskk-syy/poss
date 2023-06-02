import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    "name",
    "address",
    "contact",
    "status",
    'action',
  ];

  constructor() { }

  ngOnInit(): void {
  }


  getData(){

  }

  addCall(){

  }

  filterFarmers(){

  }

  getFarmerByFarmerNo(){

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
