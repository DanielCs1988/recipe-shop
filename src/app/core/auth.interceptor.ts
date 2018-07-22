import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {switchMap, take} from 'rxjs/operators';
import {AuthState} from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
        take(1),
        switchMap((state: AuthState) => {
            const moddedReq = req.clone({params: req.params.set('auth', state.token)});
            return next.handle(moddedReq);
        })
    );
  }

}
