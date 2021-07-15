import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authServiceSubscription!: Subscription;

  loggedUser: User | null = null;
  username: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.user.subscribe((actualUser: User | null) => {
      this.loggedUser = actualUser
      this.username = actualUser?.username
    })
  }

  onLogOut(): void{
    this.authService.logout();
  }

  ngOnDestroy(): void{
    this.authServiceSubscription.unsubscribe();
  }

}
