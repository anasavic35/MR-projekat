import { Component, OnInit } from '@angular/core';
import { ProfileModel } from './profile.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: ProfileModel = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  currentUser: any;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        
        this.currentUser = user;
        console.log("Ulogovani user je:");
        
        console.log(user.email); 
        console.log(user.displayName); 
    
        
      } else {
        
        this.router.navigate(['/login']);
      }
    });
  }




  saveProfile(){

  }
  handleButtonClick() {

  }

}
