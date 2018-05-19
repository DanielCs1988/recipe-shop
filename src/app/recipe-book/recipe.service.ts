import {Recipe} from '../models/Recipe';
import {Observable, of, Subject} from 'rxjs';

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private mockData: Recipe[] = [
    new Recipe(
      1,
      'Marinated goose liver',
      'One of the tastiest holiday meals.',
      'https://i.pinimg.com/736x/c0/6b/21/c06b21174d1ad40cd17440d416addc06--le-foie-perfect-wedding.jpg',
      [
        {name: 'Goose liver', amount: 5},
        {name: 'Potato', amount: 3}
      ]
    ),
    new Recipe(
      2,
      'T-bone steak',
      'Medium rare as it should be!',
      'https://cdn3.volusion.com/pxtff.jqtkl/v/vspfiles/photos/TB20-2.jpg?1514363306',
      [
        {name: '25oz aged beef steak', amount: 1},
        {name: 'Random veggies', amount: 10},
        {name: 'Potato', amount: 3}
      ]
    )
  ];

  constructor() { }

  generateId(): number {
    return Math.max(...this.mockData.map(recipe => recipe.id)) + 1;
  }

  getRecipes(): Observable<Recipe[]> {
    return of(this.mockData.slice());
  }

  getRecipe(id: number): Observable<Recipe> {
    // TODO: should be immutable return value
    return of(this.mockData.find(
      recipe => recipe.id === id
    ));
  }

  updateRecipe(newRecipe: Recipe) {
    for (let i = 0; i < this.mockData.length; i++) {
      if (this.mockData[i].id === newRecipe.id) {
        this.mockData[i] = newRecipe;
        break;
      }
    }
    this.recipesChanged.next(this.mockData.slice());
  }

  createRecipe(newRecipe: Recipe) {
    newRecipe.id = this.generateId();
    this.mockData.push(newRecipe);
    this.recipesChanged.next(this.mockData.slice());
  }

  deleteRecipe(id: number) {
    this.mockData = this.mockData.filter(recipe => recipe.id !== id);
    this.recipesChanged.next(this.mockData.slice());
  }
}
