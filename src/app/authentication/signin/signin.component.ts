import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { NotificationService } from "src/app/data/services/notification.service";

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
    private tokenStorage: TokenStorageService,
    private notificationApi:NotificationService
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
      this.error = "All fields are needed !";
       this.notificationApi.alertWarning("All fields  are  required");
      return;
    } else {
      this.authService.login(this.authForm.value).subscribe({
        next:(result: any) => {
          if(result.statusCode == 200) {
            const res = result;
            this.tokenStorage.saveToken(res.token);
            this.tokenStorage.saveUser(res.payload);
            const role = res.payload.role;
            console.log("role", role)
    
            if (role === Role.Admin || role === Role.STOREKEEPER || role === Role.CASHIER) {
              this.router.navigate(['/dealer/dashboard'])
            }
            // } else if (role == Role.Manager) {
            //   this.router.navigate(['/manager/dashboard'])
            // }
            //  else {
            //   this.error = "Username or Password are invalid";
            // this.notificationApi.alertWarning("Username or Password are invalid");

            // }
            console.log(this.error)
    
            this.submitted = false;
            this.loading = false;
          }
        },
        error: (err) => {
          if(err){
            this.error = err;
            this.submitted = false;
            this.loading = false;
            this.notificationApi.alertWarning("Something wrong  happened");
          } else {
            this.error = "Server Error"
            this.notificationApi.alertWarning("Something wrong  happened");
          }          
        },
        complete: () => {}
      })
    }
  }
}
