import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from './comment.model';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { ReservationModel } from '../reservation.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  private _comment=new BehaviorSubject<CommentModel[]>([]);


  get reservations() {
    return this._comment.asObservable();
  }


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
        return this._comment;
      }),
      take(1),
      tap((comments) => {
      
        newComment.id=generatedId;
        comments.push(newComment);
        this._comment.next(comments);
      })

    )
  }









}
