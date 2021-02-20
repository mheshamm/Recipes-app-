import { Component, OnInit, OnDestroy } from '@angular/core';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  edit = faKeyboard
  private subscription: Subscription;


  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number, e: any) {
    this.slService.startedEditing.next(index);
    e.target.parentElement.querySelectorAll(".high").forEach(e =>
      e.classList.remove("high"));

    e.target.classList.add("high");




  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
