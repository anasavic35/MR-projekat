import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selectedTime: string | null = null;
  selectTime(time: string) {
    this.selectedTime = time;
    console.log('Izabrano vreme:', time);
  }

  isSelected(time: string): boolean {
    return this.selectedTime === time;
  }
}
