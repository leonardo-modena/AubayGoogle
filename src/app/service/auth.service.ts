import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User | null>();
  refreshTokenInterval!: any;

  constructor(private httpService: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    clearInterval(this.refreshTokenInterval);
    return this.httpService
      .post<User>('http://localhost:3000/auth/login', {
        user: username,
        password: password,
      })
      .pipe(
        tap((confirmedUser) => {
          let newUser: User = confirmedUser;
          newUser.username = username;
          this.user.next(newUser);
          this.refreshLogin();
        })
      );
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
            this.httpService.post('http://localhost:3000/auth/refreshToken', {
              refreshToken: user.refreshToken,
            });
          }, (user.tokenExpireIn - Date.now()));
        } else this.logout();
      }
    });
  }
}
