import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/login/login.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: SearchBarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchBarComponent},
  { 
    path: 'admin', component: AdminComponent,
    //canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
