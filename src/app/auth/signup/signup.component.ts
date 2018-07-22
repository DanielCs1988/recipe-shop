import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {TrySignup} from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  @ViewChild('signupForm') signupForm: NgForm;

  constructor(private store: Store<AppState>) { }

  onSignup() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.store.dispatch(new TrySignup({ email, password }));
  }
}
