import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RecipesFeatureState, RecipesState} from '../store/recipe.reducers';
import {AddRecipe, UpdateRecipe} from '../store/recipe.actions';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    private readonly RECIPES_ENDPOINT = 'https://ng-recipe-book-afefb.firebaseio.com/recipes.json';
    recipeForm: FormGroup;
    editMode = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<RecipesFeatureState>,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                const id = params['id'];
                this.editMode = id !== undefined;
                if (this.editMode) {
                    this.store.select('recipes')
                        .pipe(take(1))
                        .subscribe((recipeState: RecipesState) => {
                            const recipe = recipeState.recipes.find(recipe => recipe.id === +id);
                            if (!recipe) {
                                this.router.navigate(['../'], {relativeTo: this.route});
                            } else {
                                this.initForm(recipe);
                            }
                        });
                } else {
                    this.initForm();
                }
            }
        );
    }

    private initForm(recipe?: Recipe) {
        let id = -1;
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
            this.store.dispatch(new UpdateRecipe(this.recipeForm.value));
        } else {
            this.store.dispatch(new AddRecipe(this.recipeForm.value));
        }
        // This is anti-pattern but the whole structure would need to be rewritten to do it properly in an effect
        // And this is Udemy course so I would rather work on my own project.
        this.store.select('recipes').pipe(take(1)).subscribe((recipeState: RecipesState) => {
            this.http.put(this.RECIPES_ENDPOINT, recipeState.recipes).subscribe();
        });
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
