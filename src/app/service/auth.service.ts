import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) { }


  login(username: string, password: string) {
    this.httpService.post("http://localhost:3000/auth/login", {user: username, password: password}).subscribe((data) => {
      console.log(data);
      
    })
  }
}
