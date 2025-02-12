import { Injectable } from "@angular/core";
import { Recipe } from "../../types/recipe.type";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipes: Recipe[] = [
    {
      "id": 1,
      "name": "Chicken Fried Rice",
      "ingredients": ["chicken", "rice", "eggs", "soy sauce"],
      "steps": ["Cook rice", "Fry chicken", "Mix everything together"],
      "image": "https://example.com/chicken-fried-rice.jpg"
    },
    {
      "id": 2,
      "name": "Tomato Pasta",
      "ingredients": ["pasta", "tomatoes", "garlic", "olive oil"],
      "steps": ["Boil pasta", "Make tomato sauce", "Combine"],
      "image": "https://example.com/tomato-pasta.jpg"
    }
  ]

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id]
  }
}