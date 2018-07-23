import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {RecipesFeatureState, RecipesState} from '../store/recipe.reducers';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {Recipe} from '../../models/Recipe';
import {DeleteRecipe} from '../store/recipe.actions';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

    private readonly RECIPES_ENDPOINT = 'https://ng-recipe-book-afefb.firebaseio.com/recipes.json';
    private paramSubscription: Subscription;
    recipe: Recipe;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<RecipesFeatureState>,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.paramSubscription = this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.store.select('recipes')
                    .pipe(take(1))
                    .subscribe((recipeState: RecipesState) => {
                        const recipe = recipeState.recipes.find(recipe => recipe.id === this.id);
                        if (!recipe) {
                            this.router.navigate(['../'], {relativeTo: this.route});
                        } else {
                            this.recipe = recipe;
                        }
                    });
            }
        );
    }

    ingredientsToCart() {
        this.store.dispatch(new AddIngredients(this.recipe.ingredients));
    }

    editRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    deleteRecipe() {
        this.store.dispatch(new DeleteRecipe(this.id));
        // This is anti-pattern but the whole structure would need to be rewritten to do it properly in an effect
        // And this is Udemy course so I would rather work on my own project.
        this.store.select('recipes').pipe(take(1)).subscribe((recipeState: RecipesState) => {
            this.http.put(this.RECIPES_ENDPOINT, recipeState.recipes).subscribe();
        });
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.paramSubscription.unsubscribe();
    }
}
