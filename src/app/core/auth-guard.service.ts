import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {map, take, tap} from 'rxjs/operators';
import {AuthState} from '../auth/store/auth.reducers';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
        take(1),
        map((state: AuthState) => state.authenticated),
        tap(isAuthenticated => {
            if (!isAuthenticated) {
                this.router.navigate(['/']);
            }
        })
    );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(null, null);
  }
}
