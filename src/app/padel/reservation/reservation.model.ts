/*export interface ReservationModel {
  fieldId: string;
  date: Date;
  time: string;
  id:string
  userId: string;
}*/

import { FieldModel } from "./field/field.model";
import { TimeModel } from "./time/time.model";

export class ReservationModel {


  constructor(public id:string, public field :FieldModel,public date:Date, public time:TimeModel, public userId: string | null){

  }

}