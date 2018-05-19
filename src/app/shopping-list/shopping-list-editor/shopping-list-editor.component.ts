import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientService} from '../ingredient.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Ingredient} from '../../models/Ingredient';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css']
})
export class ShoppingListEditorComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm') slForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  ingredient: Ingredient;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.editSubscription = this.ingredientService.startedEditing.subscribe(
      (ingredient: Ingredient) => {
        this.editMode = true;
        this.ingredient = ingredient;
      }
    );
  }

  submitItem(form: NgForm) {
    if (!form.valid) return;
    if (this.editMode) {
      this.ingredientService.updateIngredient(this.ingredient.id, form.value.name, form.value.amount);
    } else {
      this.ingredientService.addIngredient(form.value.name, form.value.amount);
    }
    this.clearForm();
  }

  clearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
