import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
export interface responseDataa {
    idToken	: string ,	
    email	:string	,
    expiresIn :	string,
    localId : string
    refreshToken :	string ,
    registered? : boolean ,
}
@Injectable({
    providedIn : 'root' 
})


export class AuthService {
  constructor(private http : HttpClient , private router : Router , private activatedRouter : ActivatedRoute){}
  expireTime : any ;

  user = new BehaviorSubject<User>(null)
    signUp(mail : string , pass : string ){
 return this.http.post<responseDataa>
 ("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEN7J3cCbjdar-9X4D0GeA_uifQ9pPmVw" ,
  {
    email : mail ,
    password : pass ,
    returnSecureToken : true 
}).pipe(tap(resData=>{
    const expireDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
    const user = new User(resData.email , resData.localId , resData.idToken , expireDate);
    this.user.next(user);
    localStorage.setItem('userData' , JSON.stringify(user));
    this.autoLogOut(+resData.expiresIn*1000)

    
}))
    }

    signIn(email : string , pass : string ){
        return this.http.post<responseDataa>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEN7J3cCbjdar-9X4D0GeA_uifQ9pPmVw',
        {
            email : email ,
            password : pass ,
            returnSecureToken : true 
        }  ).pipe(tap(resDataa=>{
            const expireDate = new Date(new Date().getTime() + +resDataa.expiresIn*1000);
            const user = new User(resDataa.email , resDataa.localId , resDataa.idToken , expireDate);
            this.user.next(user);
            localStorage.setItem('userData' , JSON.stringify(user));
            this.autoLogOut(+resDataa.expiresIn*1000)
            
        
            
        }))
    }
    logOut(){
        this.user.next(null);
        localStorage.removeItem('userData');
    }
    
    autoLogin(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email , userData.id , userData._token , userData._tokenExpireDate );
        if(userData._tokenExpireDate){
            this.user.next(loadedUser);
            const expiresTime = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
            this.autoLogOut(expiresTime) ;
        }
        
        
    }
    autoLogOut(expireDuration : number ){
        this.expireTime = setTimeout(()=>{
            this.logOut();
        } , expireDuration)
        

    }
}




