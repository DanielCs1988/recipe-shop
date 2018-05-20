import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditorComponent } from './shopping-list/shopping-list-editor/shopping-list-editor.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import {DropdownDirective} from './dropdown.directive';
import {AppRoutingModule} from './app-routing.module';
import {EmptyRecipeComponent} from './recipe-book/empty-recipe.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeService} from './recipe-book/recipe.service';
import {IngredientService} from './shopping-list/ingredient.service';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingListComponent,
    ShoppingListEditorComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    DropdownDirective,
    EmptyRecipeComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [RecipeService, IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
