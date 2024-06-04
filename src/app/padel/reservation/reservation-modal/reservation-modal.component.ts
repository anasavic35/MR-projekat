import { Component, Input, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import { ReservationModel } from '../reservation.model';
import { ReservationPage } from '../reservation.page';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentService } from '../comment/comment.service';
import { Subscription, switchMap, take, tap } from 'rxjs';
import { CommentModel } from '../comment/comment.model';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
  providers: [ReservationPage]
})
export class ReservationModalComponent  implements OnInit {
  @Input()
  reservationData!: ReservationModel;
  newComment: string = '';

  comments: CommentModel[] = [];
  private commentSub: Subscription | undefined;


  constructor(private modalCtrl: ModalController, private reservationPage: ReservationPage,
    private authService: AuthService, 
    private commentService: CommentService,
    private reservationService: ReservationService  
  ) { }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {

    this.commentSub=this.commentService.comments.subscribe((comments:CommentModel[])=>{
      
      console.log(comments);
       this.comments=comments;
        });


  }

  ionViewWillEnter(){
   /* this.commentService.getCommentsForReservation(this.reservationData).subscribe((comments:CommentModel[])=>{
      
     

  });*/
}
/*
  addComment() {
    if (!this.newComment.trim()) {
      console.error('Morate uneti tekst komentara!');
      return;
    }

    const reservation = this.reservationData.id;
    const text = this.newComment;

    this.commentService.addComment(reservation, text).subscribe(() => {
      console.log('Uspešno dodat komentar!');
      this.newComment = '';
    }, (error) => {
      console.error('Greška prilikom dodavanja komentara:', error);
    });
  }
  addComment() {
    if (!this.newComment.trim()) {
      console.error('Morate uneti tekst komentara!');
      return;
    }

    const reservationId = this.reservationData.id;
    const text = this.newComment;

    this.commentService.addComment(reservationId, text).subscribe(() => {
      console.log('Uspešno dodat komentar!');
      this.newComment = ''; // Očisti unos
      this.commentService.getCommentsForReservation(this.reservationData.id).subscribe(comments => {
        this.comments = comments;
      });
    }, (error) => {
      console.error('Greška prilikom dodavanja komentara:', error);
    });
  }*/
  addComment() {
    if (!this.newComment.trim()) {
      console.error('Morate uneti tekst komentara!');
      return;
    }

    const reservation = this.reservationData;
    const text = this.newComment;

    this.commentService.addComment(reservation, text).subscribe(() => {
      console.log('Uspešno dodat komentar!');
      this.newComment = ''; // Očisti unos
      // Dodaj novi komentar u reservationData.comments
      this.commentService.getCommentsForReservation(reservation.id).subscribe(comments => {
        this.reservationData.comments = comments;
      });
    }, (error) => {
      console.error('Greška prilikom dodavanja komentara:', error);
    });
  }


  

}
