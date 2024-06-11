import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileModel } from './profile.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: ProfileModel = {
    profileId:'',
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  userProfile: ProfileModel | null = null;
  editMode: boolean = false;
  private authSubscription: Subscription | undefined;
  private profileSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router,
    private profileService:ProfileService, private alertController: AlertController
  ) { }


  ngOnInit(): void {
    this.authSubscription = this.authService.userId.subscribe(userId => {
      console.log('ID trenutno prijavljenog korisnika:', userId);
      if (userId) {
        this.profileSubscription = this.profileService.getProfile(userId).subscribe(profile => {
          console.log('Profil trenutno prijavljenog korisnika:', profile);
          this.userProfile = profile;
          this.profile = { ...profile, profileId: userId };
        });
      }
    });
  }


  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }



  saveProfile(){
    if (this.userProfile) {
      this.profileService.updateProfile(this.userProfile.profileId, this.profile).subscribe(() => {
        console.log('Profil je uspešno ažuriran.');
        this.editMode = false;
        this.presentSuccessAlert();
      }, (error) => {
        console.error('Došlo je do greške prilikom ažuriranja profila:', error);
        this.presentErrorAlert(); 
      });
    }

  }
  handleButtonClick() {
    this.editMode = true;

  }
 

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Uspešno!',
      message: 'Profil je uspešno ažuriran.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Greška!',
      message: 'Došlo je do greške prilikom ažuriranja profila.',
      buttons: ['OK']
    });

    await alert.present();
  }
  

  

}
