import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
