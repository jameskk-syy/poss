import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonRoutingModule } from './salesperson-routing.module';
import { SalespersonComponent } from './salesperson/salesperson.component';


@NgModule({
  declarations: [
    SalespersonComponent
  ],
  imports: [
    CommonModule,
    SalespersonRoutingModule
  ]
})
export class SalespersonModule { }
