import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from, map, of, switchMap, take, tap } from 'rxjs';
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

  getToken(): Observable<string | null> {
    return this._user.asObservable().pipe(
      take(1),
      map(user => {
        return user ? user.token : null;
      })
    );
  }
  

  register(user: UserData): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      switchMap(userCredential => {
        const firebaseUser = userCredential.user;
        if (!firebaseUser) {
          throw new Error('User registration failed');
        }
        return from(firebaseUser.getIdToken()).pipe(
          switchMap(idToken => {
            const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
            const userProfile: ProfileModel = {
              profileId: firebaseUser.uid,
              name: user.name!,
              surname: user.surname!,
              email: user.email,
              password: user.password,
            };
            this._user.next(new User(firebaseUser.uid, user.email, idToken, expirationTime));
            return this.http.put(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/profiles/${firebaseUser.uid}.json`, userProfile).pipe(
              tap(() => console.log('User profile saved:', userProfile))
            );
          })
        );
      })
    );
  }

  logIn(user: UserData): Observable<any> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      { email: user.email, password: user.password, returnSecureToken: true }
    ).pipe(
      tap(userData => {
        const expirationTime = new Date(new Date().getTime() + +userData.expiresId * 1000);
        const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
        this._user.next(user);
      })
    );
  }

  logOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this._user.next(null);
      console.log("Uspesno odjavljen korisnik!");
    }).catch(error => {
      console.error("Greška prilikom odjavljivanja korisnika:", error);
      throw error;
    });
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        return user ? user.id : null;
      })
    );
  }

 




}
