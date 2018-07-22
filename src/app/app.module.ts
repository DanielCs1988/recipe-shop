import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ShoppingModule} from './shopping-list/shopping.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CoreModule,
        ShoppingModule,
        AuthModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([AuthEffects]),
        StoreRouterConnectingModule,
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
