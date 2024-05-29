import { Injectable } from '@angular/core';
import { TimeModel } from './time.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

interface TimesData{
  id: number;
  timeSlot: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  
  private _times=new BehaviorSubject<TimeModel[]>([]);

  constructor(private http:HttpClient) { }

  get times(){
    return this._times.asObservable();
  }



  getTimes(){
    return this.http.get<{[key:string]:TimeModel}>(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/time.json`).
    pipe(map((timesData:{[key:string]:TimeModel})=>{
      const times:TimeModel[]=[];
      
      for(const key in timesData){
        if(timesData.hasOwnProperty(key)){
          times.push({
            id:key,
            timeSlot:timesData[key].timeSlot

          });
        }
      }
      
      return times;
      
    }),
    tap(times=>{
      this._times.next(times);

    })
  );
  }



  
}
