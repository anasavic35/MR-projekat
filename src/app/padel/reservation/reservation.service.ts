import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReservationModel } from './reservation.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  private reservationCollection = this.firestore.collection<ReservationModel>('reservations');

  constructor(private firestore: AngularFirestore, 
    private http:HttpClient,private authService: AuthService
  ) { }

  /*addReservation(reservation: ReservationModel) {
    return this.reservationCollection.add(reservation);
  }*/

  private _reservation=new BehaviorSubject<ReservationModel[]>([]);
  addReservation(fieldId: string, date: Date, time:string) {
    let generatedId: string;
    return this.http.post<{ name: string }>(
      `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation.json?auth=${this.authService}`,
      { fieldId, date, time }).pipe(
      switchMap((resData) => {
        generatedId = resData.name;
        return this._reservation;
      }),
      take(1),
      tap((reservations) => {
        reservations.push({
          id: generatedId,
          fieldId,
          date,
          time
        });
      })
    );
  }
 
  
  
  
  
  
  
  
  
  





}
