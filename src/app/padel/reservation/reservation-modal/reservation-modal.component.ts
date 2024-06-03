import { Component, Input, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import { ReservationModel } from '../reservation.model';
import { ReservationPage } from '../reservation.page';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentService } from '../comment/comment.service';
import { switchMap, take, tap } from 'rxjs';

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


  constructor(private modalCtrl: ModalController, private reservationPage: ReservationPage,
    private authService: AuthService, 
    private commentService: CommentService 
  ) { }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

  addComment() {
    if (!this.newComment.trim()) {
      console.error('Morate uneti tekst komentara!');
      return;
    }

    const reservation = this.reservationData;
    const text = this.newComment;

    this.commentService.addComment(reservation, text).subscribe(() => {
      console.log('Uspešno dodat komentar!');
    }, (error) => {
      console.error('Greška prilikom dodavanja komentara:', error);
    });
  }

}
