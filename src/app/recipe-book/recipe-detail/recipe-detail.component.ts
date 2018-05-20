import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {RecipeService} from '../recipe.service';
import {IngredientService} from '../../shopping-list/ingredient.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  private paramSubscription: Subscription;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.recipe = this.recipeService.getRecipe(id);
        if (this.recipe === undefined) this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

  ingredientsToCart() {
    this.ingredientService.addIngredients(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
