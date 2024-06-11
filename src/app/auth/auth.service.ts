import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from, map, switchMap, tap } from 'rxjs';
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
export interface ProfileModel {
  profileId: string;
  name: string;
  surname: string;
  email: string;
  password: string;
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
/*
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

  }*/
  
      
       register(user: UserData): Observable<any> {
        return from(
          this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        ).pipe(
          tap((userCredential) => {
            const firebaseUser = userCredential.user;
            if (firebaseUser) {
              const profileId = firebaseUser.uid;
              return firebaseUser.getIdToken().then((idToken) => {
                const expirationTime = new Date(
                  new Date().getTime() + 3600 * 1000
                );
                const userProfile: ProfileModel = {
                  profileId: profileId,
                  name: user.name!,
                  surname: user.surname!,
                  email: user.email,
                  password: user.password,
                };
                this._user.next(
                  new User(profileId, user.email, idToken, expirationTime)
                );
                return this.http
                  .put(
                    `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/profiles/${profileId}.json`,
                    userProfile
                  )
                  .toPromise()
                  .then(() => console.log('User profile saved:', userProfile));
              });
            } else {
              throw new Error('User registration failed');
            }
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
/*
  logOut(){
    this._user.next(null);

  }*/

    logOut() {
      return new Promise<void>((resolve, reject) => {
        this.afAuth.signOut().then(() => {
          this._user.next(null);
          console.log("Uspesno odjavljen korisnik!");
          resolve();
        }).catch((error) => {
          console.error("Greška prilikom odjavljivanja korisnika:", error);
          reject(error);
        });
      });
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
