import { Component, OnInit } from '@angular/core';
import {Recipe} from '../models/Recipe';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {

  currentRecipe: Recipe;

  constructor() {
    this.changeRecipe = this.changeRecipe.bind(this);
  }

  ngOnInit() {
  }

  changeRecipe(recipe: Recipe) {
    this.currentRecipe = recipe;
  }

}
