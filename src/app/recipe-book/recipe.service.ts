import {Recipe} from '../models/Recipe';
import {Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  private url = 'https://ng-recipe-book-afefb.firebaseio.com/recipes.json';

  recipes: Recipe[] = [];

  constructor(private http: HttpClient) {
    this.getRecipes();
  }

  getRecipes(): void {
    this.http.get<Recipe[]>(this.url).pipe(
      map(recipes => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
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
    this.http.put(this.url, this.recipes).subscribe();
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
}
