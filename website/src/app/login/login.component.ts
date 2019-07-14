

  import { Component, OnInit } from '@angular/core';
  import {Router} from "@angular/router";
  
  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    ngOnInit(): void {
      throw new Error("Method not implemented.");
    }
    username:string;
    password:string;
    check:boolean=true;
  
    constructor(
      private router:Router,
    ) { }
  
    onSubmit(){
      if (this.username=="admin" && this.password=="admin") {
        this.check=true;
        localStorage.setItem('token' , 'userName');
        this.router.navigate(['/home/dashboard']);
      } else {
        this.check=false;
        return;
      }
  }
  
  }
