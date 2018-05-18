import {Injectable} from '@angular/core';
import {Ingredient} from '../models/Ingredient';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  recipeIngredients = new Subject<Ingredient[]>();

  private mockData: Ingredient[] = [
    new Ingredient('Beef sirloin', 10),
    new Ingredient('Cheese', 5),
    new Ingredient('Potatoes', 20),
    new Ingredient('Goose liver', 7)
  ];

  constructor() { }

  getIngredients(): Observable<Ingredient[]> {
    return of(this.mockData.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.mockData.push(ingredient);
    this.recipeIngredients.next(this.mockData.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.mockData.push(...ingredients);
    this.recipeIngredients.next(this.mockData.slice());
  }
}
