import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { CONFIGS } from "../../configs/config";

@Injectable({
    providedIn: 'root'
})

export class EmployeeAPIService {
    employeeURL = CONFIGS.API_URL + "api/employee";

    constructor(private http:HttpClient){}

    async getAllEmployees():Promise<any[]> {
        try {
            return firstValueFrom(this.http.get<any[]>(this.employeeURL));
        } catch(err) {
            console.log("Unable to fetch employees", err);
            return [];
        }
    }

    async addEmployee(name:String):Promise<any> {
        try {
            return firstValueFrom(this.http.post<any>(this.employeeURL, {name:name}));
        } catch(err) {
            console.log("Unable to add employee", err);
            return [];
        }
    }
}