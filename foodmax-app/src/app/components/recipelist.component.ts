import { Component } from "@angular/core";
import { Recipe } from "../../types/recipe.type";
import { RecipeService } from "../services/recipe.service";
import { RouterLink } from "@angular/router";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { MatCardModule } from "@angular/material/card"
import { SearchBar } from "./search.component";

@Component({
  selector: 'recipe-list',
  imports: [
    RouterLink,
    MatCardModule,
    SearchBar
  ],
  template: `
    <section class="recipe-list-container">
      <header class="recipe-list-header">
        <h2>Recipe List</h2>
        <search-bar (inputEvent)="onInputSearch($event)" />
      </header>
      <section class="recipe-list">
        @defer {
          @for (recipe of recipes; track recipe.id) {
            <mat-card appearance="outlined" >
              <header>
                <mat-card-title>{{ recipe.name }}</mat-card-title>
                <mat-card-subtitle>{{ recipe.category }}</mat-card-subtitle>
              </header>
              <mat-card-content>
                <a [routerLink]="['recipe-details', recipe.id]">{{recipe.name}}</a>
              </mat-card-content>
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