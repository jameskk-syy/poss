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
export class FarmerService {
  // getFarmerStatus(id: any) {
  //   return this.http.get(`${environment.apiUrl}/api/v1/farmer/get`,httpOptions);
  // }
  private apiUrl = environment.apiUrl;
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

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }



  public getFarmers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/all`,httpOptions);
  }
  public getByFarmersByFarmerNo(farmer_no:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/membernumber?farmer_number=`+farmer_no,httpOptions);
  }
  public getFarmersByRoutes(routeId: any): Observable<any> {
    // console.log("calling api ....")
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/farmers/route/`+routeId, httpOptions)
  }
  public getFarmersById(id:any): Observable<any> {
    
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/farmer/id?farmerId=`+id,httpOptions);

  }
  registerFarmer(farmer:any){
    return this.http.post(`${environment.apiUrl}/api/v1/farmer/add`,farmer);
  }
  updateFarmer(updatedFarmer: any, farmerNo: any){
    return this.http.put(`${environment.apiUrl}/api/v1/farmer/update/${farmerNo}`, updatedFarmer, httpOptions);
  }


  
  // updateFarmer(params: any, updatedFarmer: any[]){
  //   const farmerUrl = `${environment.apiUrl}/api/v1/farmer/update`;
  //   return this.http.put(farmerUrl, {params: params}, httpOptions);
  // }

  // updateFarmer(farmerNo: number, updatedFarmerData: any): Observable<any> {
  //   const url = `${this.apiUrl}/api/v1/farmer/update/${farmerNo}`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.put(url, updatedFarmerData, { headers });
  // }



  public getSubCounties(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/Subcounty/fetch`);
  }

  public getSubCountyById(id:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/Subcounty/` + id);
  }
  public getFarmerStatement(id:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/reports/farmer/statement?farmerid=` + id);
  }
  
}
