import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './component/app-component/app.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { LoaderComponent } from './component/loader/loader.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { HeaderComponent } from './component/header/header.component';
import { AuthService } from './service/auth.service';
import { InsertFormComponent } from './component/admin/insert-form/insert-form.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ResearchItemComponent} from "./component/research-item/research-item.component";
import { ErrorComponent } from './component/error/error.component';


import { ErrorInterceptor } from './interceptor/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ResearchItemComponent,
    LoaderComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    InsertFormComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
