import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {TrySignin} from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  @ViewChild('signinForm') signInForm: NgForm;

  constructor(private store: Store<AppState>) { }

  onSignin() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.store.dispatch(new TrySignin({ email, password }));
  }
}
