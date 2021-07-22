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
  info!: string;
  logTim!: any;
  
  newResearch: boolean = false;

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit(): void {
    clearTimeout(this.logTim)
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
      ( log ) => {
        this.info = log
        this.newResearch = false;
        this.timeoutLog();
      }
    );

    this.eventServiceSubscription = this.eventService.deleteResearch.subscribe(
      ( log ) => {
        this.info = log
        this.timeoutLog();
      }
    );

    this.eventServiceSubscription = this.eventService.updateResearch.subscribe(
      ( log ) => {
        this.info = log
        this.timeoutLog();
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
        this.timeoutLog();
      }
    )
  }

  onNewResearch(){
    this.newResearch = !this.newResearch;
  }

  timeoutLog(){
    this.logTim = setTimeout(() => {
      this.error = '';
      this.info ='';
    }, 6000);
  }

  ngOnDestroy(): void{
    if (this.authServiceSubscription)
      this.authServiceSubscription.unsubscribe()
  }

}
