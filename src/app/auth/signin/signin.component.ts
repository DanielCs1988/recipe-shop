import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  @ViewChild('signinForm') signInForm: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  onSignin() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.signinUser(email, password);
  }
}
