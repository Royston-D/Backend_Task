import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserLogin } from "src/users/schemas/user-login.schema";

@Schema({
    timestamps: true,
})
export class products{
    @Prop()
    productName: string;

    @Prop()
    productPrice: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UserLogin'})
    user: UserLogin;

}

export const ProductSchema = SchemaFactory.createForClass(products);