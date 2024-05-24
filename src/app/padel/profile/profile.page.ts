import { Component, OnInit } from '@angular/core';
import { ProfileModel } from './profile.model';

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

  constructor() { }

  ngOnInit() {
  }
  saveProfile(){

  }
  handleButtonClick() {

  }

}
