import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true,
})
export class UserLogin{


    @Prop()
    userName: string;
    
    @Prop()
    userPassword: string;

}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);