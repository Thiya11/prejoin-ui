import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CONFIGS } from '../configs/config';

@Component({
  selector: 'app-employees-home',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './employees-home.component.html',
  styleUrl: './employees-home.component.scss'
})
export class EmployeesHomeComponent implements OnInit {
  public employeeFormGroup!: FormGroup;
  public employeesList!: Array<any>;

  constructor(private formBuilder:FormBuilder, private httpClient:HttpClient) {}

  ngOnInit(): void {
      this.getAllEmployees();
      this.initiateFormControls();
  }

  initiateFormControls() {
    this.employeeFormGroup = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/),  Validators.maxLength(250)])
    })
  }

  getAllEmployees() {
    this.httpClient.get(CONFIGS.API_URL + "api/employee")
    .subscribe((employees:any) => {
      this.employeesList = employees
    },
    err => {
      console.log(err)
    })
  }

  onSubmit(){
    if(this.employeeFormGroup.valid) {
      this.httpClient.post(CONFIGS.API_URL + "api/employee", this.employeeFormGroup.value)
      .subscribe((message:any)=> {
        console.log(message);
        this.getAllEmployees();
      },
      err => {
        console.log(err);
      })
    }
  }

}
