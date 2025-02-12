import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { RecipeListComponent } from './components/recipelist.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  template: `
    <h1>{{ title }}</h1>
    <router-outlet />
  `,
  styleUrl: './styles/app.component.css',
})
export class AppComponent {
  title = 'FoodMax';
}
