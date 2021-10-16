import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.autoLogIn();
  }
}
