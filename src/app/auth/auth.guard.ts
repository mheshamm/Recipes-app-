import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
@Injectable({
    providedIn : 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authServ : AuthService , private router : Router ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        
        return this.authServ.user.pipe(
            map(user => {
               return !!user
            }) , tap(isAuth =>{
                if(!isAuth){
                    return this.router.navigate(['/auth']);
                    
                }
                
                
                
                
                

            }

                
            )
            )
            
    }

}