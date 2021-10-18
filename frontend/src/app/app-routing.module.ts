import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/login/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SingleCityComponent } from './components/main/single-city/single-city.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'cities', component: SingleCityComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
