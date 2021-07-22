import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthService } from 'src/app/service/auth.service';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  authServiceSubscription!: Subscription;
  eventServiceSubscription!: Subscription;

  loggedUser!: AuthUser | null;
  username: string | undefined

  newResearch: boolean = false;

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((actualUser: AuthUser | null) => {
      this.loggedUser = actualUser
      this.username = actualUser?.username
    })

    this.eventServiceSubscription = this.eventService.newResearch.subscribe(
      () => {
        this.newResearch = false;
      }
    );

    this.eventServiceSubscription = this.eventService.endUpdate.subscribe(
      (value) => {
        this.newResearch = false;
      }
    );
  }

  onNewResearch(){
    this.newResearch = !this.newResearch;
  }

  ngOnDestroy(): void{
    if (this.authServiceSubscription)
      this.authServiceSubscription.unsubscribe()
  }

}
