import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(
    private http: HttpClient
  ) { }


  branchUrl = `${environment.apiUrl}/api/v1/branches/`

  getBranches():Observable<any>{
    return this.http.get(this.branchUrl +`get`)
  }

}
