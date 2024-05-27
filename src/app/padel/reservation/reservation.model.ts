/*export interface ReservationModel {
  fieldId: string;
  date: Date;
  time: string;
  id:string
  userId: string;
}*/

export class ReservationModel {


  constructor(public id:string, public fieldId :string,public date:Date, public time:string, public userId: string | null){

  }

}