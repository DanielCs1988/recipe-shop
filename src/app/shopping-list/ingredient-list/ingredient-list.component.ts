import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/Ingredient';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor() { }

  ngOnInit() {
    this.ingredients = [
      new Ingredient('Beef sirloin', 10),
      new Ingredient('Cheese', 5),
      new Ingredient('Potatoes', 20),
      new Ingredient('Goose liver', 7)
    ]
  }

}
