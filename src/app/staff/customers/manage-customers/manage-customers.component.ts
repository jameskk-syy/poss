import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomersService } from '../services/customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.sass']
})
export class ManageCustomersComponent implements OnInit {


  filterform: FormGroup
  selected = "";

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;

  displayedColumns: string[] = [
    'id',
    "customerNO",
    "firstname",
    "lastname",
    "contact",
    "address",
    "status",
    'action',
  ];

  constructor(
    private fb: FormBuilder, private customerservice: CustomersService
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.filterform = this.fb.group({
      customer_no: [""],
    })

    this.getData()
  }


  getData() {
    this.selected = ""
    this.isLoading = true
    this.isdata = false
    this.customerservice.fetchCustomers().subscribe(res => {
      this.data = res

      this.isLoading = false
      if (res.entity.length > 0) {
        console.log("Customers Details Response", res.entity)
        this.isdata = true
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(res.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        console.log("Customers Details Response::: No Collection", res.entity)
        this.isLoading = false
        this.isdata = false
        this.dataSource = new MatTableDataSource<any>(this.data);
      }

    })
  }

  addCall() {

  }

  filterCustomers() {

  }

  getCustomerByCustomerNo() {
    let farmerNo = this.filterform.value.farmer_no
  }

  editCall() {

  }

  deleteCall() {

  }

  viewFarmerDetails() {

  }

  viewFarmerCollections() {

  }

  farmerDetailsCall() {

  }

}
