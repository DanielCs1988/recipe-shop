import {Recipe} from '../../models/Recipe';
import {ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE} from './recipe.actions';
import {AppState} from '../../app.reducers';

export interface RecipesFeatureState extends AppState {
    recipes: RecipesState;
}

export interface RecipesState {
    recipes: Recipe[];
}

const initialState: RecipesState = {
    recipes: []
};

export function recipeReducer(state = initialState, action: RecipeActions) {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case ADD_RECIPE:
            const id = Math.max(...state.recipes.map(recipe => recipe.id)) + 1;
            console.log('In the add recipe reducer, new id:', id);
            console.log('State is:', state);
            return {
                ...state,
                recipes: [...state.recipes, {...action.payload, id: id}]
            };
        case UPDATE_RECIPE:
            const updatedRecipes = [...state.recipes];
            const indexOfRecipe = updatedRecipes.findIndex(recipe => recipe.id === action.payload.id);
            updatedRecipes[indexOfRecipe] = {...action.payload};
            return {
                ...state,
                recipes: updatedRecipes
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
            };
        default:
            return state;
    }
}
