import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { faShoppingCart , faPencilAlt , faTrashAlt , faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  scart = faShoppingCart ;
  edit = faPencilAlt ;
  delete  = faTrashAlt ;
  star = faStar ;
  count : number = 0 ;


  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router ,
              private httpServ : HttpService , private authServ : AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
      
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.countClicks();
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    this.httpServ.saveRecipes().subscribe( res => {}) ;
    
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
    this.httpServ.saveRecipes().subscribe( res => {}) ;
  }
  countClicks(){
    this.count++ ;
    

  }
  goToReviews(){
    this.router.navigate(["reviews"] ,{relativeTo: this.route} )
  }

}
