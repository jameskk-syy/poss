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
  currentDate: any;
  selected: any;
  form: any;
  datePipe: any;
  isLoading: boolean;
  date: any;
  subscription: any;
  data: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['route', 'quantity'];

  constructor(private service: TotalsCollectionService, private fb: FormBuilder) {
    this.currentDate = this.getCurrentDate();
  }

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

    this.selected = 'current_date';
    this.form = this.fb.group({
      date: [''],
    });
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
    const currentDate = this.getCurrentDate();
    this.service.getCollectRoutes(currentDate).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data.entity);
      },
      (error) => {
        console.error('Error fetching today\'s data:', error);
      }
    );
  }

  getData() {
    // Implement the logic for 'all' case as needed
  }

  filterByDate() {
    const selectedDate = this.form.value.date;
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    this.date = formattedDate;
    console.log("selected date is" + this.date);

    this.isLoading = true;

    this.subscription = this.service.getCollectRoutes(this.date).subscribe(
      {
        next: (data: any) => {
          this.dataSource = new MatTableDataSource(data.entity);
        },
        error: (error) => {
          console.log("error occurred");
        }
      }
    );
  }
}
