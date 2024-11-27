import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AccountService } from "../../data/services/account.service";
import { Account } from "../../data/types/account";

@Component({
  selector: "app-user-widgets",
  templateUrl: "./user-widgets.component.html",
  styleUrls: ["./user-widgets.component.sass"],
})
export class UserWidgetsComponent extends BaseComponent implements OnInit {
  activeAccounts: number = 0;
  totalAccounts: number = 0;
  deletedAccounts: number = 0;
  lockedAccounts: number = 0;
  activeAccountsArray: Account[] = [];
  inactiveAccountsArray: Account[] = [];
  deletedAccountsArray: Account[] = [];
  lockedAccountsArray: Account[] = [];

  constructor(
    // private accountService: AccountService, 
    private userService: UserService,
    private router: Router
    ) {
    super();
  }

  ngOnInit(): void {
    this.getActiveUserAccounts();
    this.getTotalAccounts();
  }

  getActiveUserAccounts() {
    this.userService.fetchAllActiveAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.activeAccountsArray = res.userData;          

          this.activeAccounts = this.activeAccountsArray.length;
          this.totalAccounts += this.activeAccounts;
          
          this.getLockedAccounts();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getTotalAccounts() {
    this.totalAccounts = this.activeAccounts + this.deletedAccounts + this.lockedAccounts;
  }

  getDeletedAccounts() {
    this.userService
      .fetchAllDeletedUserAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.deletedAccountsArray = res.userData;

          this.deletedAccounts = this.deletedAccountsArray.length;
          this.totalAccounts += this.deletedAccounts;
          this.getTotalAccounts();
        },
        (err) => {
          this.deletedAccountsArray=[]
          this.deletedAccounts = 0;
          
        }
      );
  }

  getLockedAccounts() {
    this.userService
      .fetchAllLockedUserAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.lockedAccountsArray = res.userData;

          this.lockedAccounts = this.lockedAccountsArray.length;
          this.totalAccounts += this.lockedAccounts;
          this.getDeletedAccounts();
        },
        (err) => {
          this.lockedAccountsArray=[]
          this.lockedAccounts = 0
        }
      );
  }

  viewActivateUserAccounts() {
    this.router.navigate(["/admin/user-accounts/active-accounts"]);
  }

  viewInactiveUserAccounts() {
    this.router.navigate(["/admin/user-accounts/all"]);
  }

  viewdeletedAccounts() {
    this.router.navigate(["/admin/user-accounts/deleted-accounts"]);
  }

  viewLockedAccounts() {
    this.router.navigate(["/admin/user-accounts/locked-accounts"]);
  }
}
