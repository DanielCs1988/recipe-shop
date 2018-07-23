import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {FETCH_RECIPES, SET_RECIPES} from './recipe.actions';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../../models/Recipe';

@Injectable()
export class RecipeEffects {

    private readonly RECIPES_ENDPOINT = 'https://ng-recipe-book-afefb.firebaseio.com/recipes.json';

    @Effect()
    recipeFetch = this.actions$.ofType(FETCH_RECIPES).pipe(
        switchMap(() => this.http.get<Recipe[]>(this.RECIPES_ENDPOINT)),
        map(recipes => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: SET_RECIPES,
                payload: recipes
            }
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) { }
}
