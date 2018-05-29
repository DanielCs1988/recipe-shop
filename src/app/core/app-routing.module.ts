import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {AuthGuardService} from './auth-guard.service';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'recipes', loadChildren: '../recipe-book/recipes.module#RecipesModule', canLoad: [AuthGuardService]},
  {path: 'shopping', component: ShoppingListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
