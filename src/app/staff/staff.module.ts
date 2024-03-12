import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RidersComponent } from './collectors/riders/riders.component';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
  
  ]
})
export class StaffModule { }
