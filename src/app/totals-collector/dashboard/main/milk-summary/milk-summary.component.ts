import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TotalsCollectionService } from 'src/app/totals-collector/services/totals-collection.service'; 

@Component({
  selector: 'app-milk-summary',
  templateUrl: './milk-summary.component.html',
  styleUrls: ['./milk-summary.component.sass']
})
export class MilkSummaryComponent implements OnInit {
  currentDate: any
  selected: any;
  form: any;
  datePipe: any;
  isLoading: boolean;
  subscription: any;
  data: any;
  constructor(private service: TotalsCollectionService, private fb: FormBuilder) {this.currentDate = this.getCurrentDate()
  } 


  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['route', 'quantity'];

 
  ngOnInit(): void {
    
    const currentDate = this.getCurrentDate();
    this.service.getCollectRoutes(currentDate).subscribe(
      (data: any) => {
        console.log("data", data);
        this.dataSource = new MatTableDataSource(data.entity);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.selected = 'current_date'
    this.form = this.fb.group({
     date: [''],

    });
  }
  date(date: any) {
    throw new Error('Method not implemented.');
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
  getTodaysData() {
    throw new Error('Method not implemented.');
  }
  getData() {
    throw new Error('Method not implemented.');
  }
  filterByDate() {
    this.date = this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd');
    this.isLoading = true;
    

    this.subscription = this.service.getCollectRoutes(this.date).subscribe(res => {
      this.data = res;
      if (this.selected == "current_date") {
      this.getTodaysData()
    }
    });
    };
    };
  
 

function getTodaysData() {
  throw new Error('Function not implemented.');
}

function getData() {
  throw new Error('Function not implemented.');
}

