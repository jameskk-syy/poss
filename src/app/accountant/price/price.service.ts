import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PriceService {

  priceUrl = `${environment.apiUrl}/api/v1/price/`

  constructor(private http: HttpClient) { 

  }

  public fetchPrices(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/price/get/all`, httpOptions)
  }

  public addPrice(data: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/price/add`, data, httpOptions)
  }

  public updatePrice(id: any, data: any,): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/v1/price/update/${id}`, data, httpOptions)
  }

  public fetchByID(id: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/customer/customer/id?customerId=${id}`, httpOptions)
  }

  public fetchByStatus(status: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/customer/customer/status?status=${status}`)
  }

  public deletePrice(id: any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/api/v1/price/delete/${id}`)
  }

  public fetchRoutes(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/routes/get`)
  }

}
