import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {RecipeService} from '../recipe.service';
import {IngredientService} from '../../shopping-list/ingredient.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.recipeService.recipeChanged.subscribe(
      (recipe: Recipe) => this.recipe = recipe
    );
  }

  ingredientsToCart() {
    this.ingredientService.addIngredients(this.recipe.ingredients);
  }
}
