import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../models/Ingredient';
import {IngredientService} from './ingredient.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private recipeSubscription: Subscription;


  constructor(private ingredientService: IngredientService) {
    let test = new Map<string, string>();
    test.set('this', 'that');
    test.set('saa', 'dssads');
    console.log(test);
  }

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
    this.recipeSubscription = this.ingredientService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

  onEditIngredient(ingredient: Ingredient) {
    this.ingredientService.startEditing(ingredient);
  }
}
