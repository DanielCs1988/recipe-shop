import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ShoppingModule} from './shopping-list/shopping.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    ShoppingModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
