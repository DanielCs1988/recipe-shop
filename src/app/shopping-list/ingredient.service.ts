import {Ingredient} from '../models/Ingredient';
import {Observable, of, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {SocketClient} from '../../socket-lib/SocketClient';

@Injectable()
export class IngredientService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<Ingredient>();
  ingredients: Ingredient[] = [];

  constructor(private socket: SocketClient) {
    this.socket.send('ingredients/get', null, (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
      this.emitChange();
    });
  }

  private emitChange() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  generateId(): number {
    return Math.max(...this.ingredients.map(ingredient => ingredient.id)) + 1;
  }

  addIngredient(name: string, amount: number) {
    const newIngredient = new Ingredient(this.generateId(), name, amount);
    this.ingredients.push(newIngredient);
    this.emitChange();
  }

  addIngredients(items: {name: string, amount: number}[]) {
    for (let item of items) {
      const possibleMatch = this.ingredients.find(ingredient => ingredient.name === item.name);
      if (possibleMatch !== undefined) {
        possibleMatch.amount += item.amount;
      } else {
        const newIngredient = new Ingredient(this.generateId(), item.name, item.amount);
        this.ingredients.push(newIngredient);
      }
    }
    this.emitChange();
  }

  startEditing(ingredient: Ingredient) {
    this.startedEditing.next(ingredient);
  }

  updateIngredient(id: number, name: string, amount: number) {
    const ingredient = this.ingredients.find(ingredient => ingredient.id === id);
    if (ingredient === undefined) return;
    ingredient.name = name;
    ingredient.amount = amount;
    this.emitChange();
  }

  deleteIngredient(id: number) {
    this.ingredients = this.ingredients.filter(
      ingredient => ingredient.id !== id
    );
    this.emitChange();
  }

}
