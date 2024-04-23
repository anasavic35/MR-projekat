import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
  onLogIn(form:NgForm){
   /* this.authService.logIn();
    this.router.navigateByUrl('/padel/tabs/home');*/
    console.log(form);

  }

}
