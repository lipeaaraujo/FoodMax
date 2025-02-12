import { Component, inject, Input } from "@angular/core";
import { Recipe } from "../../types/recipe.type";
import { RecipeService } from "../services/recipe.service";

@Component({
  selector: 'recipe-list',
  imports: [],
  template: `
    <header>
      <h2>Recipe List</h2>
      <ul>
        @defer {
          @for (recipe of recipes; track recipe.id) {
            <li>
              <p>{{recipe.name}}</p>
            </li>
          }
        } @loading (minimum 1s) {
          <p>Loading recipe...</p>
        }
      </ul>
    </header>
  `,
  styleUrl: "../styles/recipelist.component.css"
})
export class RecipeListComponent {
  @Input() searchValue = ""
  recipeService = inject(RecipeService);

  recipes: Recipe[] = [];

  constructor() {
    this.recipes = this.recipeService.getRecipes();
  }
}