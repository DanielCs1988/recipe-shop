import {Ingredient} from '../../models/Ingredient';
import {
    ADD_INGREDIENT,
    ADD_INGREDIENTS,
    DELETE_INGREDIENT,
    ShoppingListActions,
    START_EDITING, STOP_EDITING,
    UPDATE_INGREDIENT
} from './shopping-list.actions';

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient("Apple", 5),
        new Ingredient( "Tomato", 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state, ingredients: [...state.ingredients, action.payload]
            };
        case ADD_INGREDIENTS:
            return {
                ...state,  ingredients: [...state.ingredients, ...action.payload]
            };
        case UPDATE_INGREDIENT:
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = {...action.payload};
            return {
                ...state, ingredients: updatedIngredients
            };
        case DELETE_INGREDIENT:
            const filteredIngredients = [...state.ingredients];
            filteredIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state, ingredients: filteredIngredients
            };
        case START_EDITING:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case STOP_EDITING:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;
    }
}
