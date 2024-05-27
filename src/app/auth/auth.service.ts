import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from './user.model';

interface AuthResponseData{
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  localId: string,
  expiresId: string,
  registered?: boolean;
}
interface UserData{
  name?: string,
  surname?: string,
  email: string,
  password:  string,

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated=false;
  private _user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private afAuth:AngularFireAuth) { }

  get isUserAuthenticated(){
    return this._user.asObservable().pipe(

      map((user)=>{
        if(user){
          return !!user.token;
        }else{
          return false;
        }
      })
      
    );
  }

  register(user:UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
       {email:user.email, password:user.password, returnSecureToken:true}).pipe(
        tap((userData:AuthResponseData)=>{
          const expirationTime=new Date(new Date().getTime()+ +userData.expiresId*1000);
          const user=new User(userData.localId, userData.email, userData.idToken,expirationTime);
          this._user.next(user);

        
        })
       );

  }

  logIn(user:UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
       {email:user.email, password:user.password, returnSecureToken:true}).pipe(
        tap((userData:AuthResponseData)=>{
          const expirationTime=new Date(new Date().getTime()+ +userData.expiresId*1000);
          const user=new User(userData.localId, userData.email, userData.idToken,expirationTime);
          this._user.next(user);

        
        })
       );

  }

/*
  logIn(user: UserData): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }*/

  logOut(){
    this._user.next(null);

  }

  get userId(){
    return this._user.asObservable().pipe(

      map((user)=>{
        if(user){
          return user.id;
        }else{
          return null;
        }
      })
      
    );

  }

}
