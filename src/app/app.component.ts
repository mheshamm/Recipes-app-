import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpService } from './shared/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authServ : AuthService , private httpServ : HttpService){

  }
  ngOnInit(): void {
    this.authServ.autoLogin();
    


    
  }
  
}
