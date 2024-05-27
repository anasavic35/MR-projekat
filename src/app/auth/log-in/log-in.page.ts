import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  isLoading=false;

  constructor(private authService:AuthService, private router:Router) {
    
   }

  
  ngOnInit() {
  }
  
  onLogIn(logInForm:NgForm){
   
    this.isLoading=true;
    
    console.log(logInForm);
    if(logInForm.valid){
      this.authService.logIn(logInForm.value).subscribe(resData=>{
        console.log("Uspesna prijava!");
        console.log(resData);
        this.isLoading=false;
        this.router.navigateByUrl("/padel/tabs/home")
      })
      
    }


  }
  /*
  onLogIn(logInForm: NgForm) {
    this.isLoading = true;

    if (logInForm.valid) {
      const userData = {
        email: logInForm.value.email,
        password: logInForm.value.password
      };

      this.authService.logIn(userData).then(() => {
        console.log("Uspesna prijava!");
        this.isLoading = false;
        this.router.navigateByUrl("/padel/tabs/home");
      }).catch(error => {
        console.log("Greška pri prijavi:", error);
        this.isLoading = false;
        
      });
    }
  }*/

}
