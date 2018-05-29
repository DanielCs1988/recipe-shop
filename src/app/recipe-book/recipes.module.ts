import { NgModule } from '@angular/core';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeBookComponent} from './recipe-book.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {EmptyRecipeComponent} from './empty-recipe.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {SharedModule} from '../shared.module';
import {RecipesRoutingModule} from './recipes-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    EmptyRecipeComponent,
    RecipeEditComponent
  ],
  imports: [
    SharedModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
