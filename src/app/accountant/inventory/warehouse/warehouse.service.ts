import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
baseUrl =  environment.apiUrl+'/api/v1/'
  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}get/all`);
  }

  public create(data: any) : Observable<any>{
    return this.http.post(`${this.baseUrl}add`, data);
  }

  public getByStatus(status: any): Observable<any> {
    return this.http.get(`${this.baseUrl}get/${status}`)
  }
}
