import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { RecipeListComponent } from './components/recipelist.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RecipeListComponent],
  template: `
    <h1>{{ title }}</h1>
    <p>Starter project</p>
    <section>
      <input type="text" placeholder="Search for a recipe" [(ngModel)]="searchValue"/>
      <recipe-list />
    </section>
  `,
  styleUrl: './styles/app.component.css'
})
export class AppComponent {
  title = 'FoodMax';
  searchValue = '';
}
