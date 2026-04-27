import { Component } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [SignupComponent],
})
export class AppComponent {}
