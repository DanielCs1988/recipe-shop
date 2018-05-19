import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {ActivatedRoute, Params, Router} from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

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
    let id = 0;
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      id = recipe.id;
      name = recipe.name;
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
      'id': new FormControl(id),
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': ingredients
    });
  }

  onSubmit() {
    if (!this.recipeForm.valid) return;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value);
    } else {
      this.recipeService.createRecipe(this.recipeForm.value);
    }
    this.closeEditor();
  }

  newIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+\d*$/)
      ])
    }));
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  closeEditor() {
    this.router.navigate(['/recipes']);
  }
}
