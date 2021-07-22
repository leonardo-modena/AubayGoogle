import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthRefresh } from '../model/auth-refresh.model';
import { AuthUser } from '../model/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<AuthUser | null>(null);
  refreshTokenInterval!: any;
  

  constructor(private httpService: HttpClient) {
    clearInterval(this.refreshTokenInterval)
  }

  login(username: string, password: string): Observable<void> {
    clearInterval(this.refreshTokenInterval)
    return this.httpService
      .post<AuthUser>('http://localhost:3000/auth/login', {
        user: username,
        password: password,
      })
      .pipe(
        map((confirmedUser) => {
          let newUser: AuthUser = confirmedUser;
          newUser.username = username;
          this.user.next(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          this.refreshLogin();
        })
      );
  }

  logout(): void {
    clearInterval(this.refreshTokenInterval);
    this.user.next(null);
    localStorage.removeItem('user');
  }

  refreshLogin(): void {

    this.user.subscribe((user) => {
      if (user) {
        if (!(user.refreshTokenExpireIn - Date.now() <= 0)) {
          this.IntervalRefresh(
            (user.tokenExpireIn - Date.now()),
            user.refreshToken
          );
        } else {
          console.log('started');
          this.logout();
        }
      }
    }).unsubscribe();
  }

  IntervalRefresh(interval: number, refreshToken: string): void {

    this.refreshTokenInterval = setInterval(() => {
      console.log("chiamato")
      this.httpService
        .post<AuthRefresh>('http://localhost:3000/auth/refreshToken', {
          refreshToken: refreshToken,
        })
        .subscribe((refreshResp) => {
          let actualUser = this.user.getValue();
          if (actualUser) {
            actualUser.access_token = refreshResp.access_token;
            actualUser.tokenExpireIn = refreshResp.tokenExpireIn;
          }
          this.user.next(actualUser);
        });
    }, interval);
  }

  autoLogin(): void {
    clearInterval(this.refreshTokenInterval)
    let UserSavedString = localStorage.getItem('user');

    if (!UserSavedString) {
      return;
    }
    let UserSaved: AuthUser = JSON.parse(UserSavedString);
    this.user.next(UserSaved);
    this.IntervalRefresh((UserSaved.tokenExpireIn - Date.now()), UserSaved.refreshToken);
  }
}
