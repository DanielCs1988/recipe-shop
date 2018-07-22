import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthState} from '../../auth/store/auth.reducers';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {Logout} from '../../auth/store/auth.actions';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    authState: Observable<AuthState>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.authState = this.store.select('auth');
    }

    logout() {
        this.store.dispatch(new Logout());
    }
}
