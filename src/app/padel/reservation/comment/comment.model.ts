import { ReservationModel } from "../reservation.model";

export class CommentModel {

    constructor(public id:string, public text:string, public reservation:ReservationModel  ){

    }
    
    
    
}
