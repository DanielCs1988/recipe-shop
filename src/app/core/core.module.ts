import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from '../shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from './auth.interceptor';
import {AuthService} from '../auth/auth.service';
import {AuthGuardService} from './auth-guard.service';
import {RecipeService} from '../recipe-book/recipe.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    AppRoutingModule
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    RecipeService,
    AuthService,
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class CoreModule {

}
