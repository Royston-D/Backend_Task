import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({
    timestamps: true,
})
export class UserLogin extends Document{


    @Prop()
    userName: string;
    
    @Prop()
    userPassword: string;

}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);