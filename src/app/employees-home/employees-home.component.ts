import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { EmployeeAPIService } from '../shared/services/employee-api.service';
import { Router } from '@angular/router';
import { NAME_PATTERN_WITH_JAPANESE } from '../shared/configs/general-configs';

@Component({
  selector: 'app-employees-home',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './employees-home.component.html',
  styleUrl: './employees-home.component.scss'
})
export class EmployeesHomeComponent implements OnInit {
  public employeeFormGroup!: FormGroup;
  public employeesList!: Array<any>;

  constructor(private formBuilder:FormBuilder,
              private employeeAPIService:EmployeeAPIService,
              private router: Router) {}

  ngOnInit(): void {
      this.getAllEmployees();
      this.initiateFormControls();
  }

  initiateFormControls() {
    this.employeeFormGroup = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.pattern(NAME_PATTERN_WITH_JAPANESE),  Validators.maxLength(80)])
    })
  }

  async getAllEmployees() {
    this.employeesList = await this.employeeAPIService.getAllEmployees();
  }

  get f() {
    return this.employeeFormGroup as FormGroup
  }

  async onSubmit(){
    if(this.employeeFormGroup.valid) {
      await this.employeeAPIService.addEmployee(this.employeeFormGroup.controls['name'].value);
      this.employeesList = await this.employeeAPIService.getAllEmployees();
    } else {
      this.employeeFormGroup.controls['name'].markAsDirty();
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
