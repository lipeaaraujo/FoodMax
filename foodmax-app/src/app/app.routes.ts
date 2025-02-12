import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { RecipeDetails } from './components/recipedetails.component';

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  { path: "recipe-details/:id", component: RecipeDetails, title: "Recipe Details" }
];
