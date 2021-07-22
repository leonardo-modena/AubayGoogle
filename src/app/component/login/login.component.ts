import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authServiceSubscription!: Subscription;

  errorMessage!: string | null;

  loading: boolean = false;

  authForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      "user": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(): void {
    this.loading = true;
    setTimeout(() => {
      if (this.authForm.valid) {
        this.authServiceSubscription = this.authService.login(this.authForm.controls.user.value, this.authForm.controls.password.value).subscribe(
          res => {
            this.loading = false;
            this.errorMessage = null;
            this.router.navigate(["/admin"])
            
          },
          err => {
            this.loading = false
            this.errorMessage = err;
          }
        );
      } else{
        this.loading = false
      }
    }, 800);
  }

  ngOnDestroy(): void {
    if (this.authServiceSubscription)
    this.authServiceSubscription.unsubscribe();
  }

}
