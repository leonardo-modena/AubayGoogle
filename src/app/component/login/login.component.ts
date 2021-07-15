import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginMode: boolean = false;
  authForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      "user": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  switchMode(){
    this.loginMode = !this.loginMode
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      return;
    } 
    this.authService.login(this.authForm.controls.user.value, this.authForm.controls.password.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate([""])
      },
      err => {
        console.log(err)
      }
    );
  }

}
