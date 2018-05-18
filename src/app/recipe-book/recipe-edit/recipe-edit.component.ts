import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {ActivatedRoute, Params} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  editMode = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.editMode = id !== undefined;
        if (id !== undefined) {
          this.recipeService.getRecipe(+id).subscribe(
            recipe => this.recipe = recipe
          );
        }
      }
    );
  }

}
