import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RidersComponent } from './riders/riders.component';


const routes: Routes = [{ path: 'riders', component: RidersComponent,}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CollectorsRoutingModule { }
