import { RecipeService } from './../../../s/src/app/recipes/recipe.service';
import { Subject } from 'rxjs';
import { Review } from './review.model';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor( private recipeService : RecipeService) { }
  reviewChanged = new Subject<Review[]>();
  reviews : Review[] = [
    
  ];
  allReviews(){
    return this.reviews.slice();
  }

  
  
  

  addReviews(review : Review  ){
    
    this.reviews.push(review);
    
    this.reviewChanged.next(this.reviews.slice()) ;
    
  }
  setReview(review : Review[]){
    this.reviews = review ;
    this.reviewChanged.next(this.reviews.slice());

  }
  deleteReview( ){
    this.reviews.splice(0, this.reviews.length);
    this.reviewChanged.next(this.reviews.slice());

  }





}
