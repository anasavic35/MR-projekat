import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  constructor(private authService:AuthService, private loadingController:LoadingController,
    private router:Router
  ) { }

  ngOnInit() {
    this.registerForm=new FormGroup({
      name:new FormControl('',Validators.required),
      surname:new FormControl('',Validators.required),
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null, [Validators.required, Validators.minLength(7)])


    }

    )
  }
  onRegister(){
    console.log(this.registerForm);
    this.loadingController.create({message:"Učitavanje..."}).then((loadingEl:HTMLIonLoadingElement)=>{loadingEl.
      present();
      this.authService.register(this.registerForm.value).subscribe(resData=>{
        console.log('Registracija uspesna!');
        console.log(resData);
        loadingEl.dismiss();
        this.router.navigateByUrl("/padel/tabs/home")
      })
    })
    

  }

}
