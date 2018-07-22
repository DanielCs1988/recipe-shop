import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Ingredient} from '../../models/Ingredient';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, StopEditing, UpdateIngredient} from '../store/shopping-list.actions';
import {ShoppingListState} from '../store/shopping-list.reducer';
import {AppState} from '../../app.reducers';

@Component({
    selector: 'app-shopping-list-editor',
    templateUrl: './shopping-list-editor.component.html',
    styleUrls: ['./shopping-list-editor.component.css']
})
export class ShoppingListEditorComponent implements OnInit, OnDestroy {

    @ViewChild('ingredientForm') slForm: NgForm;
    private editSubscription: Subscription;
    editMode = false;
    ingredient: Ingredient;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.editSubscription = this.store.select('shoppingList').subscribe((state: ShoppingListState) => {
            if (state.editedIngredientIndex > -1) {
                this.editMode = true;
                this.ingredient = state.editedIngredient;
            } else {
                this.editMode = false;
            }
        });
    }

    submitItem(form: NgForm) {
        if (!form.valid) return;
        const ingredient = new Ingredient(form.value.name, form.value.amount);
        if (this.editMode) {
            this.store.dispatch(new UpdateIngredient(ingredient));
        } else {
            this.store.dispatch(new AddIngredient(ingredient));
        }
        this.clearForm();
    }

    deleteItem() {
        if (!this.editMode) return;
        this.store.dispatch(new DeleteIngredient());
        this.clearForm();
    }

    clearForm() {
        this.slForm.reset();
        this.store.dispatch(new StopEditing());
    }

    ngOnDestroy(): void {
        this.editSubscription.unsubscribe();
    }
}
