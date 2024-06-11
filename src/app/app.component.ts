import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logOut().then(() => {
      console.log("Uspesno odjavljen korisnik!");
      this.router.navigateByUrl('/padel/welcome'); 
    }).catch((error) => {
      console.error("Greška prilikom odjavljivanja korisnika:", error);
    });
  }
  
}
