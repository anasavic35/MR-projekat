import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldModel } from './field/field.model';
import { FieldService } from './field/field.service';
import { Subscription } from 'rxjs';
import { ReservationService } from './reservation.service';
import { ReservationModel } from './reservation.model';
import { AlertController } from '@ionic/angular';
import { TimeService } from './time/time.service'; 
import { TimeModel } from './time/time.model';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit, OnDestroy {
  fields: FieldModel[] = [];
  selectedFieldId!: FieldModel;
  selectedDate!: Date;
  selectedTime!: TimeModel;
  times: TimeModel[] = [];

  constructor(private fieldService:FieldService, private reservationService: ReservationService, 
    private alertController: AlertController, private timeService: TimeService) { }
  

  private fieldSub: Subscription | undefined;
  private timeSub: Subscription | undefined;

  ngOnInit() {
   this.fieldSub=this.fieldService.fields.subscribe((fields:FieldModel[])=>{
  // console.log(fieldData);
      
   this.fields=fields;
    });
    this.timeSub=this.timeService.times.subscribe((times:TimeModel[])=>{
      // console.log(fieldData);
          
       this.times=times;
  })
};

  ionViewWillEnter(){
    this.fieldService.getFields().subscribe((fields:FieldModel[])=>{
      //  console.log(fieldData);
        
      //  this.fields=fields;
     

  });

  this.timeService.getTimes().subscribe((times: TimeModel[]) => {
    //this.times = times.map(time => time.timeSlot);
    
  });
   }
/*
  fields: FieldModel[] = [
    { id: 1, name: 'Teren 1' },
    { id: 2, name: 'Teren 2' },
    { id: 3, name: 'Teren 3' },
    { id: 4, name: 'Teren 4' }
  ];
*/


/*
  selectedTime: string | null = null;
  selectTime(time: string) {
    this.selectedTime = time;
    console.log('Izabrano vreme:', time);
  }

  isSelected(time: string): boolean {
    return this.selectedTime === time;
  }
  openAlert(){
    console.log('Termin je uspešno rezervisan!');
  }
*/

selectField(field: FieldModel) {
  this.selectedFieldId = field;
}

selectDate(event: any) {
  this.selectedDate = new Date(event.detail.value);
}

selectTime(time: TimeModel) {
  this.selectedTime = time;
}

isSelected(time: TimeModel): boolean {
  return this.selectedTime === time;
}
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Uspešno ste zakazali termin!',
    message: 'Vaš termin je uspešno zakazan.',
    buttons: ['OK']
  });

  await alert.present();
}
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult() {
    console.log('Potvrda');
  }

  ngOnDestroy(){
    if(this.fieldSub){
      this.fieldSub.unsubscribe();
    }

  }



  reserve() {
    if (this.selectedFieldId && this.selectedDate && this.selectedTime) {
      this.reservationService.addReservation(this.selectedFieldId, this.selectedDate, this.selectedTime).subscribe(() => {
        console.log('Uspešno ste rezervisali termin!');
        this.setResult();
        this.presentAlert();
      }, (err: any) => {
        console.error('Greška pri rezervaciji: ', err);
      });
    } else {
      console.error('Morate popuniti sve podatke!');
    }
  }


  









}
