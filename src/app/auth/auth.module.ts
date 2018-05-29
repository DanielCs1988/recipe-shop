import { NgModule } from '@angular/core';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

const authRoutes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  exports: [RouterModule]
})
export class AuthModule { }
