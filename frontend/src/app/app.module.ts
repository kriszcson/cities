import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppBootstrapModule } from './bootstrap.module';
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


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent, LoginComponent, MainComponent, CardsComponent, HeaderComponent, SingleCityComponent, NotFoundComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },/* 
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }, */
    AuthGuard, FormBuilder, AuthService, CityService, SingleCityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
