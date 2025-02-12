import { Component } from "@angular/core";
import { RecipeListComponent } from "./recipelist.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "home",
  imports: [RecipeListComponent, FormsModule],
  template: `
    <p>Starter project</p>
    <section>
      <recipe-list />
    </section>
  `,
})
export class HomeComponent { }