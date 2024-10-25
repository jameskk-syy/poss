import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-warehouse-tabs',
  templateUrl: './warehouse-tabs.component.html',
  styleUrls: ['./warehouse-tabs.component.sass']
})
export class WarehouseTabsComponent implements OnInit {
  index: any = 0
  constructor(
    private router: Router, 
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onTabChange(event: any) {
    this.index = event.index;
    console.log("index is ", this.index)
  }

}
