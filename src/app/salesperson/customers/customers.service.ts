import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }
  url=`${environment.apiUrl}/api/v1/customers/`;

  public getCustomers(): Observable<any> {
    return this.http.get<any>(this.url + 'get');
  }
}
