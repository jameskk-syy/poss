import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  userUrl = `${environment.apiUrl}/api/v1/`;

  createUser(data): Observable<any>{
    return this.http.post(this.userUrl + `auth/register`, data)
  }
}
