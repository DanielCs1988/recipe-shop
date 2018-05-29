import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeBookComponent} from './recipe-book.component';
import {EmptyRecipeComponent} from './empty-recipe.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';

const recipesRoutes: Routes = [
  {path: '', component: RecipeBookComponent, children: [
      {path: '', component: EmptyRecipeComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
