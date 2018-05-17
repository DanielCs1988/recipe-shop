import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../models/Recipe';
import {Observable, of} from 'rxjs';
import {Ingredient} from '../models/Ingredient';

export class RecipeService {

  recipeChanged = new EventEmitter<Recipe>();

  private mockData: Recipe[] = [
    new Recipe(
      'Marinated goose liver',
      'One of the tastiest holiday meals.',
      'https://i.pinimg.com/736x/c0/6b/21/c06b21174d1ad40cd17440d416addc06--le-foie-perfect-wedding.jpg',
      [
        new Ingredient('Goose liver', 5),
        new Ingredient('Potato', 3)
      ]
    ),
    new Recipe(
      'T-bone steak',
      'Medium rare as it should be!',
      'https://cdn3.volusion.com/pxtff.jqtkl/v/vspfiles/photos/TB20-2.jpg?1514363306',
      [
        new Ingredient('25oz aged beef steak', 1),
        new Ingredient('Random veggies', 10),
        new Ingredient('Potate', 3)
      ]
    )
  ];

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return of(this.mockData.slice());
  }
}
