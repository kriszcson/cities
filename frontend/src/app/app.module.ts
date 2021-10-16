import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppBootstrapModule } from './bootstrap.module';
import { AuthService } from './login/auth/auth.service';
import { LoginComponent } from './login/login.component';
import { CityService } from './services/cities.service';
import { AuthInterceptor } from './login/auth/auth.interceptor';
import { AuthGuard } from './login/auth/auth.guard';
import { GlobalErrorHandlerService } from './helpers/http-error.interceptor';
import { GlobalHttpInterceptorService } from './helpers/error.interceptor';


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
    AppComponent, LoginComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },/* 
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }, */
    AuthGuard, FormBuilder, AuthService, CityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
