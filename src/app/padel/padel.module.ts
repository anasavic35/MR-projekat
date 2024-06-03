import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PadelPageRoutingModule } from './padel-routing.module';

import { PadelPage } from './padel.page';
import { ReservationModalComponent } from './reservation/reservation-modal/reservation-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PadelPageRoutingModule
  ],
  declarations: [PadelPage, ReservationModalComponent,]
})
export class PadelPageModule {}
