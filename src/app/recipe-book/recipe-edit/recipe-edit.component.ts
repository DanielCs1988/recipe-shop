import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {ActivatedRoute, Params} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  editMode = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.editMode = id !== undefined;
        if (this.editMode) {
          this.recipeService.getRecipe(+id).subscribe(
            recipe => this.initForm(recipe)
          );
        } else {
          this.initForm();
        }
      }
    );
  }

  private initForm(recipe?: Recipe) {
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      name = recipe.title;
      description = recipe.description;
      imagePath = recipe.imagePath;
      recipe.ingredients.forEach(
        ingredient => ingredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [
            Validators.required, Validators.pattern(/^[1-9]+\d*$/)
          ])
        }))
      );
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': ingredients
    });
  }

  onSubmit() {

  }

  newIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+\d*$/)
      ])
    }));
  }
}
