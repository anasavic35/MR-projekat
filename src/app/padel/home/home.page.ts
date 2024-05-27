import { Component, OnInit } from '@angular/core';
import { ReservationModel } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  reservations: ReservationModel[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((reservations: ReservationModel[]) => {
      this.reservations = reservations;
    });
  }

}
