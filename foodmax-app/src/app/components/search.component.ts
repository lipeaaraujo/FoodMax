import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'search-bar',
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule
  ],
  template: `
    <mat-form-field>
      <input
        matInput
        type="text" 
        placeholder="Search for a recipe" 
        [(ngModel)]="searchValue"
        (input)="onInputSearch()"
      />
      <mat-icon matPrefix aria-hidden="false" aria-label="Search Icon" fontIcon="search"/>
    </mat-form-field>
  `,
  styles: `

  `
})
export class SearchBar {
  searchValue = "";
  @Output() inputEvent = new EventEmitter<string>();

  onInputSearch(): void {
    this.inputEvent.emit(this.searchValue);
  }
}