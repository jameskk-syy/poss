import { Component,  Inject,  OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.sass']
})
export class RouteDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any
  ) { }

  ngOnInit(): void {
  }

}
