import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(
    private http: HttpClient
  ) { }

  fuelUrl = `${environment.apiUrl}/api/v1/company/`;

  createFuelPurchase(data):Observable<any>{
    return this.http.post(this.fuelUrl+ `add`, data)
  }

  updateCustomer(data):Observable<any>{
    return this.http.put(this.fuelUrl + `updata`,data)
  }
  getFuelPurchases():Observable<any>{
    return this.http.get(this.fuelUrl =`get`)
  }
}
