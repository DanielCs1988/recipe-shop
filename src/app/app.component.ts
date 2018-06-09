import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthEnvvars} from '../environments/auth';
import {SocketClient} from '../socket-lib/SocketClient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private socket: SocketClient) {}

  ngOnInit(): void {
    this.socket.connect('ws://localhost:8080');
    this.socket.on('chat', msg => console.log(msg));
    this.socket.on('close', (ev) => console.error(ev));
    this.socket.on('open', ev => {
      console.info(ev);
      this.socket.send('chat', 'kek');
    });
    firebase.initializeApp({
      apiKey: AuthEnvvars.apiKey,
      authDomain: AuthEnvvars.authDomain
    });
  }

}
