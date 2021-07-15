import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginMode: boolean = false;
  authForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
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
    //codice invio dati da verificare al service
  }

}
