import { Injectable } from '@angular/core';
import { ProfileModel } from './profile.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  private _profile = new BehaviorSubject<ProfileModel | null>(null);
  
  get profile(): Observable<ProfileModel | null> {
    return this._profile.asObservable();
  }

  getProfile(profileId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/profiles/${profileId}.json`)
      .pipe(tap(profile => this._profile.next(profile)));
  }

  updateProfile(profileId: string, updatedProfile: ProfileModel): Observable<any> {
    return this.http.put<any>(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/profiles/${profileId}.json`, updatedProfile)
      .pipe(tap(() => this._profile.next(updatedProfile)));
  }





}
