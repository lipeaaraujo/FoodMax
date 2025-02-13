import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, MatToolbarModule],
  template: `
    <mat-toolbar>
      <span>{{ title }}</span>
    </mat-toolbar>
    <router-outlet />
  `,
  styleUrl: './styles/app.component.css',
})
export class AppComponent {
  title = 'FoodMax';
}
