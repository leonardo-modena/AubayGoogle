import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User | null>();
  refreshTokenInterval!: any;

  constructor(private httpService: HttpClient) {}

  login(username: string, password: string): void {
    clearInterval(this.refreshTokenInterval);
    this.httpService
      .post<User>('http://localhost:3000/auth/login', {
        user: username,
        password: password,
      })
      .subscribe((confirmedUser) => {
        let newUser: User = confirmedUser;
        newUser.username = username;
        this.user.next(newUser);
        this.refreshLogin();
      });
  }

  logout(): void {
    clearInterval(this.refreshTokenInterval);
    this.user.next(null);
  }

  refreshLogin(): void {
    this.user.subscribe((user) => {
      if (user) {
        if (!(user.refreshTokenExpireIn <= 0)) {
          this.refreshTokenInterval = setInterval(() => {
            console.log('timer partito');
            this.httpService.post('http://localhost:3000//auth/refreshToken', {
              refreshToken: user.refreshToken,
            });
          }, user.tokenExpireIn);
        } else this.logout();

      }
    });
  }
}
