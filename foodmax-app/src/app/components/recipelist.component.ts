import { Component } from "@angular/core";
import { Recipe } from "../../types/recipe.type";
import { RecipeService } from "../services/recipe.service";
import { RouterLink } from "@angular/router";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { MatCardModule } from "@angular/material/card"
import { SearchBar } from "./search.component";
import { MatButtonModule } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select"
import { MatInputModule } from "@angular/material/input"

@Component({
  selector: 'recipe-list',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    SearchBar
  ],
  template: `
    <section class="recipe-list-container">
      <header class="recipe-list-header">
        <h2>Recipe List</h2>
        <section class="recipe-list-search-section">
          <search-bar (inputEvent)="onInputSearch($event)" />
          <mat-form-field>
            <mat-label>Category</mat-label>
            <mat-select>
              <mat-option value="">Any</mat-option>
              <mat-option value="pasta">Pasta</mat-option>
              <mat-option value="salad">Salad</mat-option>
              <mat-option value="mexican">Mexican</mat-option>
              <mat-option value="vegetarian">Vegetarian</mat-option>
              <mat-option value="dessert">Dessert</mat-option>
              <mat-option value="italian">Italian</mat-option>
              <mat-option value="indian">Indian</mat-option>
              <mat-option value="breakfast">Breakfast</mat-option>
              <mat-option value="american">American</mat-option>
              <mat-option value="japanese">Japanese</mat-option>
            </mat-select>
          </mat-form-field>
        </section>
      </header>
      <section class="recipe-list">
        @defer {
          @for (recipe of recipes; track recipe.id) {
            <mat-card >
              <mat-card-header>
                <mat-card-title>{{ recipe.name }}</mat-card-title>
                <mat-card-subtitle>{{ recipe.category }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <img 
                  class="recipe-card-img" 
                  mat-card-image 
                  [src]="recipe.image" 
                />                  
              </mat-card-content>
              <mat-card-actions>
                <a mat-button [routerLink]="['/recipe-details', recipe.id]">
                  <span>See more...</span>
                  <mat-icon 
                    aria-hidden="false" 
                    aria-label="Right Arrow" 
                    fontIcon="arrow_forward"
                  />
                </a>
              </mat-card-actions>
            </mat-card>
          }
        } @loading (minimum 600ms) {
          <p>Loading recipes...</p>
        }
      </section>
    </section>
  `,
  styleUrl: "../styles/recipelist.component.css",
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  private searchSubject = new Subject<string>();

  constructor(private recipeService: RecipeService) {}

  // fetch all exercises when page loads
  ngOnInit(): void {
    this.loadRecipes();

    // define a subject for the search bar value
    this.searchSubject
      .pipe(
        debounceTime(300), // wait for 300ms after the user stops typing
        distinctUntilChanged() // only emit if the search query changes
      )
      .subscribe(query => {
        this.filterRecipes(query);
      })
  }

  // loads all recipes at the start
  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.recipes = data;
      },
      error: (error) => {
        console.error("Error fetching recipes", error)
      }
    })
  }

  // when the user inputs at the search bar, call the search subject.
  onInputSearch(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  // filter all recipes by name based on the query value.
  filterRecipes(query: string): void {
    this.recipeService.getRecipesByQuery(query).subscribe({
      next: (data: Recipe[]) => {
        this.recipes = data;
      },
      error: (error) => {
        console.error("Error querying recipes", error);
      }
    })
  }
}