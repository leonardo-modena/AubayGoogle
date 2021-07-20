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

  constructor(private httpService: HttpClient) {}

  login(username: string, password: string): Observable<void> {
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
          console.log('started');
        } else {
          this.logout();
        }
      }
    }).unsubscribe();
  }

  IntervalRefresh(interval: number, refreshToken: string): void {
    this.refreshTokenInterval = setInterval(() => {
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
          console.log(actualUser)
          this.user.next(actualUser);
        });
    }, interval);
  }

  autoLogin(): void {
    let UserSaved = localStorage.getItem('user');

    if (!UserSaved) {
      return;
    }
    this.user.next(JSON.parse(UserSaved));
    this.refreshLogin();
  }
}
