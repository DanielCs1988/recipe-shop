import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../models/Ingredient';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

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
    this.ingredientsChanged.emit(this.mockData.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.mockData.push(...ingredients);
    this.ingredientsChanged.emit(this.mockData.slice());
  }
}
