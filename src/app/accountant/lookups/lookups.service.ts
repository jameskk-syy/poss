import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LookupsService {

  usersUrl = `${environment.apiUrl}/api/v1/users/`

  constructor(private http: HttpClient) { 

  }
 
  public getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/api/v1/users/all-accounts`,httpOptions);
  }

  approveFarmer(farmerNo: any):Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/farmer/approve-registration/${farmerNo}`,httpOptions);
    }
  
  fetchFarmers() {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/get`,httpOptions);
  }
  farmersByActivity(activity:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/activity?activity=`+activity,httpOptions)
  }
  farmersWithNoDeliveries() {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/no-deliveries`,httpOptions)
  }

  
}

