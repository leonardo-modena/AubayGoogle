import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
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
        if (! (((user.refreshTokenExpireIn - Date.now())) <= 0) ) {
          this.IntervalRefresh((user.tokenExpireIn - Date.now()), user.refreshToken)
        } else this.logout();
      }
    });
  }

  IntervalRefresh(interval: number, refreshToken: string){
    this.refreshTokenInterval = setInterval(() => {
      this.httpService.post('http://localhost:3000/auth/refreshToken', {
        refreshToken: refreshToken
      }).subscribe((res) => {
        console.log(res);
      });
    }, 2000);

  }
}
