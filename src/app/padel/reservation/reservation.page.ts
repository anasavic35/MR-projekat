import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldModel } from './field/field.model';
import { FieldService } from './field/field.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit, OnDestroy {
  

  constructor(private fieldService:FieldService) { }
  
  fields: FieldModel[] = [];
  private fieldSub: Subscription | undefined;

  ngOnInit() {
   this.fieldSub=this.fieldService.fields.subscribe((fields:FieldModel[])=>{
  // console.log(fieldData);
      
   this.fields=fields;
    });
  }

  ionViewWillEnter(){
    this.fieldService.getFields().subscribe((fields:FieldModel[])=>{
      //  console.log(fieldData);
        
      //  this.fields=fields;

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
}
