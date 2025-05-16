import { Routes } from '@angular/router';
import { EmployeesHomeComponent } from './employees-home/employees-home.component';
import { CoreComponent } from './core/core.component';

export const routes: Routes = [
    {
        path: "employees",
        component: EmployeesHomeComponent
    },
    {
        path: '',
        component: CoreComponent
    }
];
