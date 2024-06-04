import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from './comment.model';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { ReservationModel } from '../reservation.model';
import { AuthService } from 'src/app/auth/auth.service';

interface CommentData{
  reservation:ReservationModel,
  text:string,
  userId:string
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  private _comment=new BehaviorSubject<CommentModel[]>([]);


  get comments() {
    return this._comment.asObservable();
  }


  addComment(reservation: ReservationModel, text: string) {
    let generatedId: string;
    let newComment: CommentModel;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        newComment = new CommentModel('', text, reservation.id);
        return this.http.post<{ name: string }>(
          `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth=${this.authService}`, 
          { ...newComment, id: null }
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        newComment.id = generatedId;
        return this.http.put(
          `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comments/${generatedId}.json?auth=${this.authService}`,
          { ...newComment, id: generatedId }
        );
      }),
      switchMap(() => this.http.get<ReservationModel>(
        `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation/${reservation.id}.json?auth=${this.authService}`
      )),
      switchMap((updatedReservation) => {
        if (!updatedReservation.comments) {
          updatedReservation.comments = [];
        }
        updatedReservation.comments.push(newComment);
        return this.http.put(
          `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/reservation/${reservation.id}.json?auth=${this.authService}`,
          updatedReservation
        );
      }),
      switchMap(() => this._comment),
      take(1),
      tap(comments => {
        newComment.id = generatedId;
        comments.push(newComment);
        this._comment.next(comments);
      })
    );
  }




/*

  addComment(reservationID: string, text: string) {
    let generatedId: string;
    let newComment: CommentModel;
    return this.authService.userId.pipe(
        take(1),
        switchMap(userId => {
            newComment = new CommentModel('', text, reservationID);
            return this.http.post<{ name: string }>(
                `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comment.json?auth=${this.authService}`, 
                { ...newComment, id: null }
            );
        }),
        switchMap((resData) => {
            generatedId = resData.name;
            newComment.id = generatedId;
            return this.http.put(
                `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comment/${generatedId}.json?auth=${this.authService}`,
                { ...newComment, id: generatedId }
            );
        }),
        switchMap(() => {
            return this._comment;
        }),
        take(1),
        tap((comments) => {
            comments.push(newComment);
            this._comment.next(comments);
        })
    );
}

  
/*

getComment(reservation:ReservationModel) {
  return this.http.get<{[key: string]: CommentData}>(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comment.json?auth`)
    .pipe(
      map((commentData: any) => {
        const comments: CommentModel[] = [];
        for (const key in commentData) {
          if (commentData.hasOwnProperty(key) && commentData[key].reservation.id===reservation.id) {
            console.log(commentData[key].reservation.id)
            console.log(reservation.id)
            console.log("isti")
            comments.push(new CommentModel(
              key,
              commentData[key].text,
              commentData[key].reservation,
            ));
          }
        }
        return comments;
      }),
      tap((comments) => {
        this._comment.next(comments);
      })
    );
}



  getCommentsForReservation(reservation:ReservationModel) {
    return this.http.get<{ [key: string]: CommentData }>(
      `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comment.json?auth`
    ).pipe(
      map(commentData => {
        const comments: CommentModel[] = [];
        for (const key in commentData) {
          if (commentData.hasOwnProperty(key) && commentData[key].reservation.id === reservation.id) {
            comments.push(new CommentModel(
              key,
              commentData[key].text,
              commentData[key].reservation
            ));
          }
        }
        return comments;
      })
    );
  }




}
/*
addComment(reservation: ReservationModel, text:string){
    let generatedId: string;
    let newComment:CommentModel;
    return this.authService.userId.pipe(take(1),switchMap(userId=>{
      newComment=new CommentModel('', text,reservation);

      return this.http.post<{ name: string }>(
        `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comment.json?auth=${this.authService}`, newComment);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        newComment.id = generatedId; 
        return this._comment;
      }),
      take(1),
      tap((comments) => {
      
        newComment.id=generatedId;
        comments.push(newComment);
        this._comment.next(comments);
      })

    )
    */


    getCommentsForReservation(reservationId: string): Observable<CommentModel[]> {
      return this.http.get<{[key: string]: CommentModel}>(
        `https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth`
      ).pipe(
        map(commentData => {
          const comments: CommentModel[] = [];
          for (const key in commentData) {
            if (commentData.hasOwnProperty(key) && commentData[key].reservationId === reservationId) {
              comments.push({ ...commentData[key], id: key });
            }
          }
          return comments;
        })
      );
    }




  }


