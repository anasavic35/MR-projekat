

import { CommentModel } from "./comment/comment.model";
import { FieldModel } from "./field/field.model";
import { TimeModel } from "./time/time.model";

export class ReservationModel {


  constructor(public id:string, public field :FieldModel,public date:Date, public time:TimeModel, 
    public userId: string | null,public comments: CommentModel[] = []){

  }

}