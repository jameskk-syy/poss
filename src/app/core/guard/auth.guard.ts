import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthService } from "../service/auth.service";
import { TokenStorageService } from "../service/token-storage.service";
import { json } from "node:stream/consumers";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenStorage.getUser();
  
    if (currentUser && currentUser.role) {
      console.log("user role:", currentUser.role);
  
      if (route.data.role && route.data.role.indexOf(currentUser.role) === -1) {
        this.router.navigate(["/authentication/signin"]);
        return false;
      }
      return true;
    }
  
    this.router.navigate(["/authentication/signin"]);
    return false;
  }
  
}
