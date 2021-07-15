import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';

const routes: Routes = [
  { path: "", component: SearchBarComponent },
  { path: "auth", component: AdminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
