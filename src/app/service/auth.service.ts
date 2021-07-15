import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  refreshTokenInterval!: any;

  constructor(private httpService: HttpClient) {}

  login(username: string, password: string): void {
    clearInterval(this.refreshTokenInterval);
    this.httpService
      .post<User>('http://localhost:3000/auth/login', {
        user: username,
        password: password,
      })
      .subscribe((data) => {
        this.user.username = username;
        this.user = data;
      });
      this.refreshLogin();
  }

  logout(){
    
  }

  refreshLogin(): void{
    if (!(this.user.tokenExpireIn <= 0)){
      this.refreshTokenInterval = setInterval(() => {
        console.log("timer partito")
        this.httpService.post('http://localhost:3000//auth/refreshToken', {
          refreshToken: this.user.refreshToken,
        })
      }, this.user.refreshTokenExpireIn);
    }
  }
}
