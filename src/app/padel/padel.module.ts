import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PadelPageRoutingModule } from './padel-routing.module';

import { PadelPage } from './padel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PadelPageRoutingModule
  ],
  declarations: [PadelPage]
})
export class PadelPageModule {}
