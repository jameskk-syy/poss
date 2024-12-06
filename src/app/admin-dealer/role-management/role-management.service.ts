import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

   roleUrl = `${environment.apiUrl}/admin/api/v1/roles/`

  constructor(private http: HttpClient) { }

  

  
  getRoleDetails(roleId): Observable<any>{
    const getRoleDetailsUrl = `${environment.apiUrl}/admin/api/v1/roles/${roleId}`;

    return this.http.get<any>(getRoleDetailsUrl)
  }

  fetchAllAccessRights(): Observable<any>{
    const fetchAllAccessRightsUrl = `${environment.apiUrl}/admin/api/v1/roles/access-rights`;

    return this.http.get<any>(fetchAllAccessRightsUrl)
  }

  activateRole(roleId): Observable<any>{
    const activateRoleUrl = `${environment.apiUrl}/admin/api/v1/roles/activate-role/${roleId}`;
    return this.http.put(this.roleUrl + `activate-role`, {})
  }

  getAllActiveRoles(): Observable<any>{
    return this.http.get(this.roleUrl + `active-roles`, {})
  }

  getAllRoles(): Observable<any>{
    return this.http.get(this.roleUrl + `all-roles`)
  }

  createRole(role): Observable<any>{
    return this.http.post(this.roleUrl + `create-role`, role)
  }

  deactivateRole(roleId): Observable<any>{
    return this.http.put(this.roleUrl +`deactivate-role`, roleId )
  }

  getAllinactiveRoles(roleId): Observable<any>{
    return this.http.put(this.roleUrl +`inactive-role`, roleId )
  }

  updateRole(role): Observable<any>{
    return this.http.put(this.roleUrl +`update-role`, role )
   
  }
  
}
