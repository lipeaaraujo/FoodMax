import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { RecipeService } from "../services/recipe.service";
import { Recipe } from "../../types/recipe.type";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion"
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'recipe-details',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
  ],
  template: `
    <section class="recipe-details-content">
      @defer {
        <header>
          <a mat-button routerLink="/">
            <span>Return to recipe list</span>
            <mat-icon 
              aria-hidden="false" 
              aria-label="Back Arrow" 
              fontIcon="arrow_back"
            />
          </a>
        </header>
        <mat-card>
          <mat-card-header>
            <mat-card-title>
              <span>{{ recipe?.name }}</span>
            </mat-card-title>
            <mat-card-subtitle>
              <span>{{ recipe?.category }}</span>
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <img [src]="recipe?.image" />
          </mat-card-content>
          <mat-card-footer>
            <mat-expansion-panel [expanded]="true">
              <mat-expansion-panel-header>
                <mat-panel-title>Ingredients</mat-panel-title>
                <mat-panel-description>
                  Ingredients used in this recipe
                  <mat-icon 
                    aria-hidden="false" 
                    aria-label="Ingredients" 
                    fontIcon="menu_book"
                  />
                </mat-panel-description>
              </mat-expansion-panel-header>
              <ul>
                @for (ingredient of recipe?.ingredients; track $index) {
                  <li>{{ ingredient }}</li>
                }
              </ul>
            </mat-expansion-panel>
            <mat-expansion-panel [expanded]="true">
              <mat-expansion-panel-header>
                <mat-panel-title>Steps</mat-panel-title>
                <mat-panel-description>
                  Follow step by step
                  <mat-icon 
                    aria-hidden="false" 
                    aria-label="Steps" 
                    fontIcon="blender"
                  />
                </mat-panel-description>
              </mat-expansion-panel-header>
              <ul>
                @for (step of recipe?.steps; track $index) {
                  <li type="1">{{ step }}</li>
                }
              </ul>
            </mat-expansion-panel>
          </mat-card-footer>
        </mat-card>
        
      } @loading (minimum 300ms) {
        <p>Loading recipe...</p>
      }
    </section>
  `,
  styleUrl: "../styles/recipedetails.component.css"
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