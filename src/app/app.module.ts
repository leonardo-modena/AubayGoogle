import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './component/app-component/app.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { ResearchContainerComponent } from './component/research-container/research-container.component';
import { ResearchItemComponent } from './component/research-container/research-item/research-item.component';
import { LoaderComponent } from './component/loader/loader.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ResearchContainerComponent,
    ResearchItemComponent,
    LoaderComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
