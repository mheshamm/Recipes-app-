import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn : 'root'
})

export class RecipesGuard implements CanActivate {
    constructor(private authServ : AuthService , private router : Router ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        
        if(localStorage.getItem('userData') !== null){
           
            alert("You are signed in Please Log Out to access this Page");
            return this.router.navigate(['/recipes']);
        }
        return true ;
        
        
            
    }

}