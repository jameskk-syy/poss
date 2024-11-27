import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerRoutingModule } from './dealer-routing.module';

import { ViewBranchesComponent } from './view-branches/view-branches.component';


@NgModule({
  declarations: [
    
    ViewBranchesComponent
  ],
  imports: [
    CommonModule,
    DealerRoutingModule
  ]
})
export class DealerModule { }
