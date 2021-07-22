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

  error!: string; 
  errorTim!: any;

  newResearch: boolean = false;

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit(): void {
    clearTimeout(this.errorTim)
    this.authService.user.subscribe(
      (actualUser: AuthUser | null) => {
      this.loggedUser = actualUser
      this.username = actualUser?.username
    },
      (err) => {
        this.eventService.emitError(err);
      }
    )

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

    this.eventServiceSubscription = this.eventService.newError.subscribe(
      (newError) => {
        this.error = newError;
        this.errorTimeout();
      }
    )
  }

  onNewResearch(){
    this.newResearch = !this.newResearch;
  }

  errorTimeout(){
    this.errorTim = setTimeout(() => {
      this.error = '';
    }, 6000);
  }

  ngOnDestroy(): void{
    if (this.authServiceSubscription)
      this.authServiceSubscription.unsubscribe()
  }

}
