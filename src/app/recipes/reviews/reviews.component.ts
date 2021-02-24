
import { Recipe } from '../recipe.model';
import { RecipeService } from "../recipe.service";
import { ReviewsService } from './../../shared/reviews.service';
import { Review } from './../../shared/review.model';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  id: number;
  subscription: Subscription;
  currentRate = 2.5;
  reviews: any = []
  rev: any = []
  name : string = null
 

  constructor(private httpser: HttpService, private route: ActivatedRoute,
     private reviewServ: ReviewsService, private recServ: RecipeService) { }

  ngOnInit(): void {
    this.subscription = this.reviewServ.reviewChanged
      .subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews;


        }
      );
    this.reviews = this.reviewServ.allReviews();
    this.httpser.fetchReviews().subscribe(res => { });



    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params)
          this.id = +params['id'];
          this.name=this.recServ.getRecipe(this.id).name ;
          this.reviews = this.reviewServ.allReviews();





        }
      );
      
      
    this.httpser.fetchReviews().subscribe(res => { });













  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const new1 = new Review(this.id, value.tittle, value.review, this.currentRate , this.name)
    console.log(new1)
    this.reviewServ.addReviews(new1);

    form.resetForm();
    this.currentRate = 2
    this.httpser.saveReviews().subscribe(res => { });









  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
