import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/http.service';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  add = faPlus ;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute , private httpServ : HttpService) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
    this.httpServ.fetchRecipes().subscribe(res=> {});
    
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    this.httpServ.saveRecipes().subscribe( res => {}) ;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
