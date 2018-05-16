import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../models/Recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  @Output() recipeSwitch = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
    this.recipes = [
      new Recipe(
        'Marinated goose liver',
        'One of the tastiest holiday meals.',
        'https://i.pinimg.com/736x/c0/6b/21/c06b21174d1ad40cd17440d416addc06--le-foie-perfect-wedding.jpg',
        []
      ),
      new Recipe(
        'T-bone steak',
        'Medium rare as it should be!',
        'https://cdn3.volusion.com/pxtff.jqtkl/v/vspfiles/photos/TB20-2.jpg?1514363306',
        []
      ),
    ]
  }

}
