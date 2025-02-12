import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../../types/recipe.type";
import { RecipeService } from "../services/recipe.service";
import { RouterLink } from "@angular/router";
import { error } from "node:console";
import { FormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

@Component({
  selector: 'recipe-list',
  imports: [RouterLink, FormsModule],
  template: `
    <header>
      <h2>Recipe List</h2>
      <input 
        type="text" 
        placeholder="Search for a recipe" 
        [(ngModel)]="searchValue"
        (input)="onInputSearch()"
      />
      <ul>
        @defer {
          @for (recipe of recipes; track recipe.id) {
            <li>
              <a [routerLink]="['recipe-details', recipe.id]">{{recipe.name}}</a>
            </li>
          }
        } @loading (minimum 600ms) {
          <p>Loading recipes...</p>
        }
      </ul>
    </header>
  `,
  styleUrl: "../styles/recipelist.component.css"
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  searchValue = ""
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
  onInputSearch(): void {
    this.searchSubject.next(this.searchValue);
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