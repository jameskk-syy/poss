import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-totals-collections',
  templateUrl: './view-totals-collections.component.html',
  styleUrls: ['./view-totals-collections.component.sass']
})
export class ViewTotalsCollectionsComponent implements OnInit {
  addAccumulationForm :FormGroup;
  milkQuantity: any;
  ph:any;
  sight: any;
  route: any;
  density: any[];
  session: any[];
  collectorId: any[];
  smell: any;

  constructor(public dialogRef: MatDialogRef<ViewTotalsCollectionsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : any
    
  ) { }

  ngOnInit(): void {
    
    console.log("data passed ", this.data)
    this.addTotalsForm();
    this.bindData(this.data.collection)
  }
  addTotalsForm(): void{
    this.addAccumulationForm = this.fb.group({
      milkQuantity: ['', Validators.required],
      collectorName:['',Validators.required],
      session:['',Validators.required],
      routeName:['',Validators.required],
      ph:['',Validators.required],
      density:['',Validators.required],
      sight:['',Validators.required],
      smell:['',Validators.required],
      temperature:['',Validators.required],
      resazurin:['',Validators.required],
      
    })
}

bindData(collection: any): void {
  this.addAccumulationForm.get('milkQuantity').patchValue(collection.milkQuantity);
  this.addAccumulationForm.get('collectorName').patchValue(collection.collectorName);
  this.addAccumulationForm.get('session').patchValue(collection.session);
  this.addAccumulationForm.get('routeName').patchValue(collection.routeName);
  this.addAccumulationForm.get('ph').patchValue(collection.ph);
  this.addAccumulationForm.get('density').patchValue(collection.density);
  this.addAccumulationForm.get('sight').patchValue(collection.sight);
  this.addAccumulationForm.get('smell').patchValue(collection.smell);
  this.addAccumulationForm.get('temperature').patchValue(collection.temperature);
  this.addAccumulationForm.get('resazurin').patchValue(collection.resazurin);
  
}

onClick(){
  this.dialogRef.close();
}
}

