import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../recipes/recipe.model";
import { HttpService } from "./http.service";
@Injectable({
    providedIn : "root" 
})

export class RecipesResolver implements Resolve<Recipe[]> {
    constructor(private httpServ : HttpService ){

    }
    resolve( route : ActivatedRouteSnapshot , state : RouterStateSnapshot){
        
        
        return this.httpServ.fetchRecipes();
    }

}