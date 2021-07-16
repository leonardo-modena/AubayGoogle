import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './component/app-component/app.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { ResearchContainerComponent } from './component/research-container/research-container.component';
import { ResearchItemComponent } from './component/research-container/research-item/research-item.component';
import { LoaderComponent } from './component/loader/loader.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { HeaderComponent } from './component/header/header.component';
import { AuthService } from './service/auth.service';
import { InsertFormComponent } from './component/admin/insert-form/insert-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ResearchContainerComponent,
    ResearchItemComponent,
    LoaderComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    InsertFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
