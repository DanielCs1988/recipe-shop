import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {RecipesFeatureState, RecipesState} from '../store/recipe.reducers';
import {FetchRecipes} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipesState: Observable<RecipesState>;

  constructor(private store: Store<RecipesFeatureState>) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
    this.store.dispatch(new FetchRecipes());
  }
}
