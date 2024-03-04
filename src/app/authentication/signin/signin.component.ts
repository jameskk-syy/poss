import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)


    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.authService.login(this.authForm.value).subscribe(res => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res);
        const role = res.roles[0].name;

        if (role == Role.Admin) {
          this.router.navigate(['/admin/dashboard'])
        } else if (role == Role.Staff) {
          this.router.navigate(['/staff/dashboard'])
        } else if (role == Role.Collector) {
          this.router.navigate(['/collections/dashboard'])
        } else if (role == Role.SalesPerson) {
          this.router.navigate(['/sales-person/dashboard'])
        } else if (role == Role.Manager) {
          this.router.navigate(['/manager/dashboard'])
         }
         else if (role== Role.TotalsCollector){
          this.router.navigate(['/totals-collector/dashboard'])
         }
         else if (role == Role.Accountant) {
          this.router.navigate(['/accountant/dashboard']).then(() => {
            console.log('Navigation to accountant dashboard resolved');
          }).catch(error => {
            console.error('Navigation to accountant dashboard rejected:', error);
          });
        }
        
         else {
          this.error = "Username or Password are invalid";
        }
        console.log(this.error)

        this.submitted = false;
        this.loading = false;

      }, err => {
        this.error = 'Username or Password are invalid';
        this.submitted = false;
        this.loading = false;
      })
    }
  }
}
