import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
          console.log("started")
        } else this.logout();
      }
    });
  }

  IntervalRefresh(interval: number, refreshToken: string): void{
    this.refreshTokenInterval = setInterval(() => {
      this.httpService.post('http://localhost:3000/auth/refreshToken', {
        refreshToken: refreshToken
      }).subscribe((res) => {
        console.log(res);
      });
    }, interval);

  }
}
