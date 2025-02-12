import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { RecipeService } from "../services/recipe.service";
import { Recipe } from "../../types/recipe.type";
import { error } from "console";

@Component({
  selector: 'recipe-details',
  imports: [RouterLink],
  template: `
    @defer {
      <section>
        <header>
          <h2>{{ recipe?.name }}</h2>
          <a routerLink="/">Return to recipe list</a> 
        </header>
        <article>
          <h3>Recipe ingredients:</h3>
          <ul>
            @for (ingredient of recipe?.ingredients; track $index) {
              <li>{{ ingredient }}</li>
            }
          </ul>
          <h3>Steps</h3>
          <ul>
            @for (step of recipe?.steps; track $index) {
              <li type="1">{{ step }}</li>
            }
          </ul>
        </article>
      </section>
    } @loading (minimum 300ms) {
      <p>Loading recipe...</p>
    }
  `
})
export class RecipeDetails {
  route: ActivatedRoute = inject(ActivatedRoute);
  recipeId: number = 0
  recipe: Recipe | undefined = undefined

  constructor(private recipeService: RecipeService) {
    this.recipeId = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.loadRecipe();
  }

  loadRecipe(): void {
    console.log(this.recipeId);
    this.recipeService.getRecipe(this.recipeId).subscribe({
      next: (data: Recipe | undefined) => {
        console.log(data);
        this.recipe = data;
      },
      error: (error) => {
        console.error("Error fetching recipe", error);
      }
    })
  }
}