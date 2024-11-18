import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(
    private http: HttpClient
  ) { }

  companyUrl = `${environment.apiUrl}/api/v1/company/`;
  customerUrl = `${environment.apiUrl}/api/v1/customer/`;
  // company
  addCompany(data):Observable<any>{
    return this.http.post(this.companyUrl+ `add`, data)
  }

  updateCompany(data):Observable<any>{
    return this.http.put(this.companyUrl + `update`,data)
  }
  getCompanies():Observable<any>{
    return this.http.get(this.companyUrl +`get`)
  }


  // customers

  addCustomer(data):Observable<any>{
    return this.http.post(this.customerUrl+ `add`, data)
  }

  updateCustomer(data):Observable<any>{
    return this.http.put(this.customerUrl + `updata`,data)
  }
  getCustomers():Observable<any>{
    return this.http.get(this.customerUrl =`get`)
  }

 

  // Departments
  addDepartment(data):Observable<any>{
    return this.http.post(this.customerUrl+ `add`, data)
  }
  updateDepartment(data):Observable<any>{
    return this.http.put(this.customerUrl + `updata`,data)
  }
  
  getDepartments():Observable<any>{
    return this.http.get(this.companyUrl =`get`)
  }

  //locations
  addLocation(data):Observable<any>{
    return this.http.post(this.customerUrl+ `add`, data)
  }
  updateLocation(data):Observable<any>{
    return this.http.put(this.customerUrl + `updata`,data)
  }
  getLocations():Observable<any>{
    return this.http.get(this.companyUrl =`get`)
  }

  //products
  addProduct(data):Observable<any>{
    return this.http.post(this.customerUrl+ `add`, data)
  }
  updateProduct(data):Observable<any>{
    return this.http.put(this.customerUrl + `updata`,data)
  }
  getProducts():Observable<any>{
    return this.http.get(this.companyUrl =`get`)
  }


}
