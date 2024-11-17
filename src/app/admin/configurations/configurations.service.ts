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
  
  addCompany(data):Observable<any>{
    return this.http.post(this.companyUrl+ `add`, data)
  }

  updateCompany(data):Observable<any>{
    return this.http.put(this.companyUrl + `updata`,data)
  }
  getCompanies():Observable<any>{
    return this.http.get(this.companyUrl =`get`)
  }

}
