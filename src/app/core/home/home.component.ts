import { Component, OnInit } from '@angular/core';
import {SocketClient} from '../../../socket-lib/SocketClient';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private socket: SocketClient) { }

  ngOnInit() {
  }

  onSendMessageOffline() {
    this.socket.send('chat', 'cached message');
  }

}
