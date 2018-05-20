import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthEnvvars} from '../environments/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: AuthEnvvars.apiKey,
      authDomain: AuthEnvvars.authDomain
    });
  }

}
