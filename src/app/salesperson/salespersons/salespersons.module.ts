import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalespersonsRoutingModule } from './salespersons-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SalespersonsRoutingModule
  ]
})
export class SalespersonsModule { }
