import { Injectable } from "@angular/core";
import { Recipe } from "../../types/recipe.type";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private recipesUrl = '/assets/recipes.json';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  getRecipe(id: number): Observable<Recipe | undefined> {
    return this.getRecipes().pipe(
      map(recipes => recipes.find(recipe => recipe.id == id))
    );
  }

  getRecipesByQuery(searchQuery : string): Observable<Recipe[]> {
    return this.getRecipes().pipe(
      map(recipes => recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery)))
    )
  }
}