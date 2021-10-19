import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppBootstrapModule } from './bootstrap.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { CityService } from './services/cities.service';
import { AuthInterceptor } from './components/login/auth/auth.interceptor';
import { AuthGuard } from './components/login/auth/auth.guard';
import { MainComponent } from './components/main/main.component';
import { CardsComponent } from './components/main/cards/cards.component';
import { HeaderComponent } from './components/header/header.component';
import { SingleCityComponent } from './components/main/single-city/single-city.component';
import { SingleCityService } from './services/single-city.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersService } from './services/users.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule, NgbModule
  ],
  declarations: [
    AppComponent, LoginComponent, MainComponent, CardsComponent, HeaderComponent, SingleCityComponent, NotFoundComponent, AdminComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard, FormBuilder, AuthService, CityService, SingleCityService, UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
