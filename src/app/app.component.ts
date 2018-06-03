import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthEnvvars} from '../environments/auth';
import {SocketRouter} from '../socket-lib/SocketRouter';
import {Controller} from '../socket-lib/Controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  router: SocketRouter;

  constructor() {
    this.router = new SocketRouter('ws://localhost:5500');
    const controller = new Controller(this.router);
    const handlers = new Map<string, Function>();
    handlers.set('chat', controller.onChat);
    handlers.set('name', controller.onNameChange);
    handlers.set('object', controller.onGetObject);
    this.router.setupRoutes(handlers);
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: AuthEnvvars.apiKey,
      authDomain: AuthEnvvars.authDomain
    });
  }

}
