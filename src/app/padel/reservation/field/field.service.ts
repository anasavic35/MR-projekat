import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FieldModel } from './field.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
interface FieldDate{
  id: number;
name: string;
}
@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private _fields=new BehaviorSubject<FieldModel[]>([]);

  constructor(private http:HttpClient) { }

  get fields(){
    return this._fields.asObservable();
  }



  getFields(){
    return this.http.get<{[key:string]:FieldModel}>(`https://padel1-app-default-rtdb.europe-west1.firebasedatabase.app/field.json`).
    pipe(map((fieldData:{[key:string]:FieldModel})=>{
      const fields:FieldModel[]=[];
      
      for(const key in fieldData){
        if(fieldData.hasOwnProperty(key)){
          fields.push({
            id:key,
            name:fieldData[key].name

          });
        }
      }
      
      return fields;
      
    }),
    tap(fields=>{
      this._fields.next(fields);

    })
  );
  }


}
