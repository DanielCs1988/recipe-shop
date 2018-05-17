import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../models/Ingredient';
import {IngredientService} from '../ingredient.service';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.css']
})
export class ShoppingListEditorComponent implements OnInit {

  constructor(private ingredientService: IngredientService) {}

  ngOnInit() {
  }

  addItem(name: HTMLInputElement, amount: HTMLInputElement, $event: Event) {
    $event.preventDefault();
    if (name.value === '' || Number(amount.value) < 1) return;

    this.ingredientService.addIngredient(
      new Ingredient(name.value, Number(amount.value))
    );
    name.value = '';
    amount.value = '';
  }
}
