import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SalespersonService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  salespersonUrl = `${environment.apiUrl}/api/v1/sales-person/`;


  onBoardSalesperson(id, whseCode, customer):Observable<any> {
    return this.http.post(this.salespersonUrl + `onboard/${id}/${whseCode}`, customer, httpOptions)
  }

  public getSalesperson():Observable<any>{
    return this.http.get(this.salespersonUrl + `get/all`,httpOptions)
  }

  
}


