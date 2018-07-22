import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Credentials, LOGOUT, SET_TOKEN, SIGNIN, SIGNUP, TRY_SIGNIN, TRY_SIGNUP, TrySignup} from './auth.actions';
import {mergeMap, pluck, switchMap, tap} from 'rxjs/operators';
import {from} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$.ofType(TRY_SIGNUP).pipe(
        pluck('payload'),
        switchMap((creds: Credentials) => {
            return from(firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password));
        }),
        switchMap(() => from(firebase.auth().currentUser.getIdToken())),
        mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: SIGNUP
                },
                {
                    type: SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    @Effect()
    authSignin = this.actions$.ofType(TRY_SIGNIN).pipe(
        pluck('payload'),
        switchMap((creds: Credentials) => {
            return from(firebase.auth().signInWithEmailAndPassword(creds.email, creds.password));
        }),
        switchMap(() => from(firebase.auth().currentUser.getIdToken())),
        mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: SIGNIN
                },
                {
                    type: SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.ofType(LOGOUT).pipe(
        tap(() => this.router.navigate(['/']))
    );

    constructor(private actions$: Actions, private router: Router) { }
}
