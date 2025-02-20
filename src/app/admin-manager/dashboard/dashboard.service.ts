import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  deptsUrl = `${environment.apiUrl}/api/v1/department/`;
  usersUrl = `${environment.apiUrl}/api/action-items/user/analytics/`;

  private getHttpOptions() {
    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return { headers };
  }

  public getSummary(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/collections/records/all`, this.getHttpOptions());
  }

  public getAllFarmers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/get`, this.getHttpOptions());
  }

  public getActiveFarmerCount(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/active-count`, this.getHttpOptions());
  }

  public getTodaysDelivery(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/accumulation/todays-total`, this.getHttpOptions());
  }

  public getDepartmentsPerSubsidiary(): Observable<any> {
    return this.http.get(this.deptsUrl + 'departments/subsidiary', this.getHttpOptions());
  }

  public getUsersPerDepartment(): Observable<any> {
    return this.http.get(this.usersUrl + 'user/department', this.getHttpOptions());
  }

  public getUsersPerRole(): Observable<any> {
    return this.http.get(this.usersUrl + 'users/role', this.getHttpOptions());
  }

  public getMeetingsPerCategory(): Observable<any> {
    return this.http.get(this.usersUrl + 'meetings/meetingcategory', this.getHttpOptions());
  }

  public getFarmerCountPerRouteUsingGET(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/farmer/farmers/count/route`, this.getHttpOptions());
  }

  createItem(data: any): Observable<any> {
    const API_URL = `${environment.apiUrl}/api/v1/items`;
    return this.http.post(API_URL, data, this.getHttpOptions()).pipe(
      map(res => res || {})
    );
  }
  updateItems(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/v1/items/${id}`, data, this.getHttpOptions());
  }
  // createBranch(data: any): Observable<any> {
  //   const API_URL = `${environment.apiUrl}/api/branches`;
  //   return this.http.post(API_URL, data, this.getHttpOptions()).pipe(
  //     map(res => res || {})
  //   );
  // }

  createBranch(data: any): Observable<any> {
    console.log("Sending data to API:", data); // Debugging
  
    const API_URL = `${environment.apiUrl}/api/branches`;
  
    return this.http.post<any>(API_URL, data, this.getHttpOptions()).pipe(
      map(response => {
        console.log("Branch created successfully:", response); // Debugging
        return response;
      }),
      catchError(error => {
        console.error("Error creating branch:", error);
        return throwError(() => new Error(error.message || "Failed to create branch"));
      })
    );
  }
  
  

  public getAllProducts(): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/items`;
    return this.http.get(url, this.getHttpOptions()).pipe(
      map(res => res || [])
    );
  }
  // public getAllBranches(): Observable<any> {
  //   const url = `${environment.apiUrl}/api/branches`;
  //   return this.http.get(url, this.getHttpOptions()).pipe(
  //     map(res => res || [])
  //   );
  // }

  getAllBranches(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/branches`, this.getHttpOptions()).pipe(
      map(response => response || []), 
      catchError(error => {
        console.error("Error fetching branches:", error);
        return throwError(() => new Error(error.message || "Failed to fetch branches"));
      })
    );
  }

  updateBranchs(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/branches/${id}`, data, this.getHttpOptions());
}

deleteBranchs(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/branches/${id}`, this.getHttpOptions());
}

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/v1/items/${id}`);
  }
  // deleteBranch(id: number): Observable<any> {
  //   return this.http.delete(`${environment.apiUrl}/api/branches/${id}`);
  // }
}
