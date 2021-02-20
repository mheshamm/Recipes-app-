import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Review } from "../../shared/review.model";
import { HttpService } from "../../shared/http.service";
@Injectable({
    providedIn : "root" 
})

export class ReviewsResolver implements Resolve<any> {
    constructor(private httpServ : HttpService ){

    }
    resolve( route : ActivatedRouteSnapshot , state : RouterStateSnapshot){
        
        
        return this.httpServ.fetchReviews();
    }

}