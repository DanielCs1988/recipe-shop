import {Ingredient} from './Ingredient';

export class Recipe {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}

}
