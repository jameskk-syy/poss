import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-statistics',
  templateUrl: './stock-statistics.component.html',
  styleUrls: ['./stock-statistics.component.sass']
})
export class StockStatisticsComponent implements OnInit {
    isLoading: boolean;
    isdata: boolean;
    data: any;
    subscription!: Subscription;
  
    
  constructor(
    private stockService: StockService
  ) { }

  ngOnInit(): void {
  }

  getWhseValueData() {
    this.isLoading = true;
    this.subscription = this.stockService.getWhseValueData().subscribe({
      next:(res) => {
        this.data = res;
        console.log('stocksss', res)
          if (this.data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
           
          } else {
            this.isLoading = false;
            
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching stock data:', err);
          this.isdata = false;
        }
    })
  }


  getWhseStatData() {
    this.isLoading = true;
    this.subscription = this.stockService.getWhseStatData().subscribe({
      next:(res) => {
        this.data = res;
        console.log('stocksss', res)
          if (this.data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
           
          } else {
            this.isLoading = false;
            
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching stock data:', err);
          this.isdata = false;
        }
    })
  }

}