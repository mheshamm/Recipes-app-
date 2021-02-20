import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { AuthService } from '../auth/auth.service';
import { faBars, faLock, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls : ["./header.component.css"]
})
export class HeaderComponent implements OnInit , OnDestroy  {
  isAuth = false ;
  menu = faBars ;
  
  
  private sub : Subscription
  constructor( private httpServ : HttpService ,  private authServ : AuthService , private router : Router ){}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.authServ.user.subscribe(user=>{
      this.isAuth =!!user;
      
      
      
      
    });
  }
  
  onSave(){
    this.httpServ.saveRecipes().subscribe( res => {

    }) ;
  }
  onFetch(){
    this.httpServ.fetchRecipes().subscribe();
  }
  onLogOut(){
    this.authServ.logOut();
    this.router.navigate(['/auth']);
  }
}
