import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { StockService } from "../../stock/stock.service";
import { SnackbarService } from "src/app/shared/snackbar.service";

@Component({
  selector: 'app-stock-widgets',
  templateUrl: './stock-widgets.component.html',
  styleUrls: ['./stock-widgets.component.sass']
})
export class StockWidgetsComponent extends BaseComponent implements OnInit {

  @Input() warehouseCode: string | null = null;

  loading: boolean = false;
  activeAccounts: number = 0;
  stockValue: {value:number; count: number} = {value:0, count:0};
  deletedAccounts: number = 0;
  lockedAccounts: number = 0;
  whseCode: any;

  constructor(
    private stockService: StockService,
    private router: Router,
    private snackbar: SnackbarService
    ) {
      super();
  }

  ngOnInit() {
    console.log('Received warehouse code in stock widgets:', this.warehouseCode);
    this.getStockValue()
  }

  getStockValue(): void {
    this.loading = true;
    const whseCode = this.warehouseCode;     
    this.stockService.getWhseValue(whseCode).subscribe({
      next: (res: any) => {
        if (res && res.entity) { 
          this.loading = false;
          this.stockValue.value = res.entity.value; 
          this.stockValue.count = res.entity.count; 
          console.log("Stock Value retrieved:", this.stockValue.value);
          console.log("Stock Count retrieved:", this.stockValue.count);
          this.snackbar.showNotification('snackbar-success', res.message);
        } else {
          this.loading = false;
          this.stockValue = { value: 0, count: 0 }; 
          console.log("No stock value data found.");
          this.snackbar.showNotification('snackbar-danger', 'No data found.');
        }
      },
      error: (err) => {
        this.loading = false;
        this.stockValue = { value: 0, count: 0 };
        console.error("Error fetching stock value:", err);
        this.snackbar.showNotification('snackbar-danger', err);
      },
      complete: () => {
        console.log("Stock value fetch complete.");
      }
    });
  }
}

