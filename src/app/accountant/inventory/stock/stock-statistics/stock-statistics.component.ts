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
  stock_value: any;
  warehouse: any;
  
    
  constructor(
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.getWhseValueData()

    this.getWhseStatData()
  }

  getWhseValueData() {
    this.isLoading = true;
    this.subscription = this.stockService.getWhseValueData("wh0").subscribe({
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
        this.stock_value = this.data.entity.stock_value;
        this.warehouse = this.data.entity.warehouse;
        console.log('stockss----s', this.warehouse)
          if (this.data.entity.length > 0 && this.data?.entity?.payload) {
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