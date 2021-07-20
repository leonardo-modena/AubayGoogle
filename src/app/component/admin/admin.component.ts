import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  authServiceSubscription!: Subscription;

  loggedUser!: AuthUser | null;
  username: string | undefined

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((actualUser: AuthUser | null) => {
      this.loggedUser = actualUser
      this.username = actualUser?.username
    })
  }

  ngOnDestroy(): void{
    if (this.authServiceSubscription)
      this.authServiceSubscription.unsubscribe()
  }

}
