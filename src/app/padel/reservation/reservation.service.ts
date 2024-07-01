import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReservationModel } from './reservation.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Time } from '@angular/common';
import { FieldModel } from './field/field.model';
import { TimeModel } from './time/time.model';
import { CommentModel } from './comment/comment.model';

interface ReservationData{
  field:FieldModel,
  date:Date,
  time:string,
  userId:string,
  comments: CommentModel[];
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  private reservationCollection = this.firestore.collection<ReservationModel>('reservations');

  constructor(private firestore: AngularFirestore, 
    private http:HttpClient,private authService: AuthService
  ) { }


  private _reservation=new BehaviorSubject<ReservationModel[]>([]);


  get reservations() {
    return this._reservation.asObservable();
  }


  getReservations() {
    return this.authService.userId.pipe(
      switchMap(userId => {
        return this.http.get<{[key: string]: ReservationData}>(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation.json`)
          .pipe(map((reservationData: any) => {
            const reservations: ReservationModel[] = [];
            for (const key in reservationData) {
              if (reservationData.hasOwnProperty(key) && reservationData[key].userId === userId) {
                reservations.push(new ReservationModel(
                  key,
                  reservationData[key].field,
                  reservationData[key].date,
                  reservationData[key].time,
                  reservationData[key].userId,
                  reservationData[key].comments || []
                ));
              }
            }
            return reservations;
          }));
      }),
      tap((reservations) => {
        this._reservation.next(reservations);
      })
    );
  }
  
  
  
  cancelReservation(reservationId: string): Observable<any> {
    return this.http.delete(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation/${reservationId}.json`);
  }
  
  
  addReservation(field: FieldModel, date: Date, time: TimeModel) {
    let generatedId: string;
    let newReservation: ReservationModel;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        newReservation = new ReservationModel('', field, date, time, userId, []);
        return this.http.post<{ name: string }>(
          `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation.json?`, 
          { ...newReservation, id: null }
        );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        newReservation.id = generatedId;
        return this.http.put(
          `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation/${generatedId}.json`,
          { ...newReservation, id: generatedId }
        );
      }),
      switchMap(() => {
        return this._reservation;
      }),
      take(1),
      tap((reservations) => {
        newReservation.id = generatedId;
        reservations.push(newReservation);
        this._reservation.next(reservations);
      })
    );
  }


  getReservationsForFieldAndDate(field: FieldModel, date: Date): Observable<ReservationModel[]> {
    return this.http.get<{ [key: string]: ReservationData }>(
      `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation.json`
    ).pipe(
      map((reservationData: any) => {
        const reservations: ReservationModel[] = [];
        for (const key in reservationData) {
          if (reservationData.hasOwnProperty(key)) {
            const reservation = reservationData[key];
            if (reservation.field.id === field.id && new Date(reservation.date).toDateString() === date.toDateString()) {
              reservations.push(new ReservationModel(
                key,
                reservation.field,
                reservation.date,
                reservation.time,
                reservation.userId,
                reservation.comments || []
              ));
            }
          }
        }
        return reservations;
      })
    );
  }

}



/*
  addReservation(field: FieldModel, date: Date, time:TimeModel){
    let generatedId: string;
    let newReservation:ReservationModel;
    return this.authService.userId.pipe(take(1),switchMap(userId=>{
      newReservation=new ReservationModel('', field, date,time, userId);

      return this.http.post<{ name: string }>(
        `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation.json?auth=${this.authService}`, newReservation);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this._reservation;
      }),
      take(1),
      tap((reservations) => {
      
        newReservation.id=generatedId;
        reservations.push(newReservation);
        this._reservation.next(reservations);
      })

    )
  }*/
  /*
 
  getReservations() {
    return this.http.get<{[key: string]: ReservationData}>(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation.json?auth`)
      .pipe(map((ReservationData: any) => {
        console.log(ReservationData);
        const reservations: ReservationModel[] = [];
        for(const key in ReservationData) {
          if(ReservationData.hasOwnProperty(key)){
            reservations.push(new ReservationModel(key, ReservationData[key].fieldId,
              ReservationData[key].date, ReservationData[key].time, ReservationData[key].userId, 
             )
  
            );

          }
          
        }
        return reservations;
      }),
        tap((quotes) => {
          this._reservation.next(quotes);
        }));
  }
  */
