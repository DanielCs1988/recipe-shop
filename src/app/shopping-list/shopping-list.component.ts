import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../models/Ingredient';
import {IngredientService} from './ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
    this.ingredientService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }
}
