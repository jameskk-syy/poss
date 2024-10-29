import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class WarehousesService {

  warehousesUrl = `${environment.apiUrl}/api/v1/sales-person/`

  constructor(private http:HttpClient) { 

  }

  public getWhseCode(userId: any): Observable<any> { 
    return this.http.get(`${this.warehousesUrl}get/user?userId=${userId}`);
  }
  
  public requestStock(data:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/stock-request/new`,data);
  }

  public getRequisitions(): Observable<any>{
     return this.http.get(`${environment.apiUrl}/api/v1/stock-request/get/all`);
  }

  public getByApproval(approved:any):Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/stock-request/get/approved?approved=${approved}`);
  }
}
