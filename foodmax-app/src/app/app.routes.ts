import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { RecipeDetails } from './components/recipedetails.component';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "recipe-details/:id", component: RecipeDetails, title: "Recipe Details" }
];
