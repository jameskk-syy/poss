import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.sass']
})
export class InventoriesComponent implements OnInit {

  constructor(
    private router: Router, 
    private dialog: MatDialog,    
    ) { }

  ngOnInit(): void {
  }

}
