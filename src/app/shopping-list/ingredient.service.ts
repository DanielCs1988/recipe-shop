import {Injectable} from '@angular/core';
import {Ingredient} from '../models/Ingredient';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  recipeIngredients = new Subject<Ingredient[]>();
  startedEditing = new Subject<Ingredient>();

  private mockData: Ingredient[] = [
    new Ingredient(1, 'Beef sirloin', 10),
    new Ingredient(2, 'Cheese', 5),
    new Ingredient(3, 'Potatoes', 20),
    new Ingredient(4, 'Goose liver', 7)
  ];

  constructor() { }

  getIngredients(): Observable<Ingredient[]> {
    return of(this.mockData.slice());
  }

  addIngredient(name: string, amount: number) {
    const newIngredient = new Ingredient(this.mockData.length + 1, name, amount);
    this.mockData.push(newIngredient);
    this.recipeIngredients.next(this.mockData.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.mockData.push(...ingredients);
    this.recipeIngredients.next(this.mockData.slice());
  }

  startEditing(ingredient: Ingredient) {
    this.startedEditing.next(ingredient);
  }

  updateIngredient(id: number, name: string, amount: number) {
    const ingredient = this.mockData.find(ingredient => ingredient.id === id);
    if (ingredient === undefined) return;
    ingredient.name = name;
    ingredient.amount = amount;
  }
}
