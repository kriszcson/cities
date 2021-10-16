import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
