import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {

  loading: any;
  userForm: FormGroup
  dialogRef: any;


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      user_name: ["", [Validators.required]],
      first_name: [""],
      last_name: [""],
      email: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      role: [""],
      
    })
  }

  onCancel(){

  }

  addUser(){

  }

  roleLookup(){

  }
  onClick() {
    this.dialogRef.close();
  }

}
