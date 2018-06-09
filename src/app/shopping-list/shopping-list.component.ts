import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../models/Ingredient';
import {IngredientService} from './ingredient.service';
import {Subscription} from 'rxjs';
import {SocketClient} from '../../socket-lib/SocketClient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private recipeSubscription: Subscription;


  constructor(private ingredientService: IngredientService) {}

  ngOnInit() {
    this.ingredients = this.ingredientService.ingredients;
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
