import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserLogin } from "./schemas/user-login.schema";
import { Model } from "mongoose";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(UserLogin.name)
        private userloginModel: Model<UserLogin>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET
        })
    }

    async validate(payload){
        const{ id } = payload;
        const user = await this.userloginModel.findById(id);
        if(!user){
            throw new UnauthorizedException(' You must Login to procced');
        }
        return user;
    }
}