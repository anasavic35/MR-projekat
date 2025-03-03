import { Component, OnInit } from '@angular/core';
import { ReservationModel } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ReservationModalComponent } from '../reservation/reservation-modal/reservation-modal.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  reservations: ReservationModel[] = [];

  constructor(private reservationService: ReservationService, private alertController: AlertController, private modalCtrl: ModalController  ) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Uspešno otkazano!',
      message: 'Vaš termin je uspešno otkazan.',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((reservations: ReservationModel[]) => {
      this.reservations = reservations;
    });
  }

  cancelReservation(reservation: ReservationModel) {
    this.reservationService.cancelReservation(reservation.id).subscribe(() => {
      this.loadReservations();
      this.presentAlert();
    });
  }

  async openModal(reservation: ReservationModel) {
    console.log(reservation)
    const modal = await this.modalCtrl.create({
      component: ReservationModalComponent,
      componentProps: {
        reservationData: reservation 
      }
    });
    return await modal.present();
  }

  onCancelButtonClick(event: Event, reservation: ReservationModel) {
    event.stopPropagation();
    this.cancelReservation(reservation);
  }
  
}
