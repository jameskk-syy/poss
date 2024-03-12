import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorsRoutingModule } from './collectors-routing.module';
import { RidersComponent } from './riders/riders.component';



@NgModule({
  declarations: [
    RidersComponent
  ],
  imports: [
    CommonModule,
    CollectorsRoutingModule
  ]
})
export class CollectorsModule { }
