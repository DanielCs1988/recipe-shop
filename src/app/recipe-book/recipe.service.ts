import {Recipe} from '../models/Recipe';
import {Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ingredient} from '../models/Ingredient';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../shopping-list/store/shopping-list.actions';
import {AppState} from '../app.reducers';

@Injectable()
export class RecipeService {

    private readonly RECIPES_ENDPOINT = 'https://ng-recipe-book-afefb.firebaseio.com/recipes.json';
    recipesChanged = new Subject<Recipe[]>();

    recipes: Recipe[] = [];

    constructor(private http: HttpClient, private store: Store<AppState>) {
        this.getRecipes();
    }

    getRecipes(): void {
        this.http.get<Recipe[]>(this.RECIPES_ENDPOINT).pipe(
            map(recipes => {
                for (let recipe of recipes) {
                    if (!recipe['shoppingListState']) {
                        recipe['shoppingListState'] = [];
                    }
                }
                return recipes;
            }),
            catchError((error: Response) => {
                console.log('Could not fetch recipes from the server!');
                return [];
            })
        ).subscribe((recipes: Recipe[]) => {
            this.recipes = recipes;
            this.recipesChanged.next(this.recipes);
        })
    }

    updatePersistence() {
        this.recipesChanged.next(this.recipes.slice());
        this.http.put(this.RECIPES_ENDPOINT, this.recipes).subscribe();
    }

    generateId(): number {
        return Math.max(...this.recipes.map(recipe => recipe.id)) + 1;
    }

    getRecipe(id: number): Recipe {
        return this.recipes.find(recipe => recipe.id === id);
    }

    updateRecipe(newRecipe: Recipe) {
        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].id === newRecipe.id) {
                this.recipes[i] = newRecipe;
                break;
            }
        }
        this.updatePersistence();
    }

    createRecipe(newRecipe: Recipe) {
        newRecipe.id = this.generateId();
        this.recipes.push(newRecipe);
        this.updatePersistence();
    }

    deleteRecipe(id: number) {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        this.updatePersistence();
    }

    addIngredientsToCart(ingredients: Ingredient[]) {
        this.store.dispatch(new AddIngredients(ingredients));
    }
}
