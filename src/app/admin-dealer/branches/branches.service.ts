import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }


  branchUrl = `${environment.apiUrl}/api/v1/branches/`
  userUrl = `${environment.apiUrl}/api/v1/user/`

  getBranches():Observable<any>{
    return this.http.get(this.branchUrl +`get`)
  }

  createBranch(data): Observable<any>{
    return this.http.post(this.branchUrl + `create`, data)
  }

  getManagers():Observable<any>{
    return this.http.get(this.userUrl + `managers`)
  }

}


