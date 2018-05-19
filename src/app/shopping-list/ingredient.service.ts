import {Ingredient} from '../models/Ingredient';
import {Observable, of, Subject} from 'rxjs';

export class IngredientService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<Ingredient>();

  private mockData: Ingredient[] = [
    new Ingredient(1, 'Beef sirloin', 10),
    new Ingredient(2, 'Cheese', 5),
    new Ingredient(3, 'Potato', 20),
    new Ingredient(4, 'Goose liver', 7)
  ];

  constructor() { }

  generateId(): number {
    return Math.max(...this.mockData.map(ingredient => ingredient.id)) + 1;
  }

  getIngredients(): Observable<Ingredient[]> {
    return of(this.mockData.slice());
  }

  addIngredient(name: string, amount: number) {
    const newIngredient = new Ingredient(this.generateId(), name, amount);
    this.mockData.push(newIngredient);
    this.ingredientsChanged.next(this.mockData.slice());
  }

  addIngredients(items: {name: string, amount: number}[]) {
    for (let item of items) {
      const possibleMatch = this.mockData.find(ingredient => ingredient.name === item.name);
      if (possibleMatch !== undefined) {
        possibleMatch.amount += item.amount;
      } else {
        const newIngredient = new Ingredient(this.generateId(), item.name, item.amount);
        this.mockData.push(newIngredient);
      }
    }
    this.ingredientsChanged.next(this.mockData.slice());
  }

  startEditing(ingredient: Ingredient) {
    this.startedEditing.next(ingredient);
  }

  updateIngredient(id: number, name: string, amount: number) {
    const ingredient = this.mockData.find(ingredient => ingredient.id === id);
    if (ingredient === undefined) return;
    ingredient.name = name;
    ingredient.amount = amount;
    this.ingredientsChanged.next(this.mockData.slice());
  }

  deleteIngredient(id: number) {
    this.mockData = this.mockData.filter(
      ingredient => ingredient.id !== id
    );
    this.ingredientsChanged.next(this.mockData.slice());
  }

}
