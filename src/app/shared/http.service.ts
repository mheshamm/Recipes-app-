import { Review } from './review.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map , tap } from 'rxjs/operators' ;
import { ReviewsService } from './reviews.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http : HttpClient , private recipeServ : RecipeService , private revSer : ReviewsService) { }
  saveReviews(){
    const reviews = this.revSer.allReviews();
    return this.http.put('https://recipes-51c2a-default-rtdb.firebaseio.com/reviews.json' , reviews) ;

    
  }
  fetchReviews(){
    return this.http.get<Review[]>('https://recipes-51c2a-default-rtdb.firebaseio.com/reviews.json').pipe(
      tap( review => {
        this.revSer.setReview(review);
      }

      )
    )
  }
  saveRecipes(){
    const recipes = this.recipeServ.getRecipes();
    return this.http.put('https://recipes-51c2a-default-rtdb.firebaseio.com/recipes.json' , recipes) ;
  }
  fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipes-51c2a-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipe=>{
      return recipe.map( recipe =>{
        return {...recipe , ingredients : recipe.ingredients ? recipe.ingredients : []}
      }
        
      )

    }),
    tap(recipe => {
      this.recipeServ.setRecipe(recipe)

    })
    )
    
  }
  
}
