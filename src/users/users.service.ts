import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLogin, UserLoginSchema } from './schemas/user-login.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(UserLogin.name)
        private userloginModel : mongoose.Model<UserLogin>,
        private jwtservice: JwtService
    ){}

    // to find user based on name.    
    async findUser(userName: string) : Promise<UserLogin | undefined>{
         const res =  this.userloginModel.findOne({userName: userName});
         return res;
    }

    // to find all available users in db
    async findAllUsers(): Promise<UserLogin[]>{
        const userList = await this.userloginModel.find();
        return userList;
    }

    // to add a new user without validation 
    async create(newuser: UserLogin): Promise<UserLogin| {message: string}| {token: string} | any >{

        const userInfo = await this.userloginModel.findOne({userName: newuser.userName});

        if(!userInfo){

            // convert password into hashed 
            const {userName, userPassword} = newuser;
            const hashedPassword = await bcrypt.hash(userPassword,8 );

            const newUser = await this.userloginModel.create({
                userName,
                userPassword: hashedPassword
            });
            console.log("New User Created"); //==> logging

            const token = this.jwtservice.sign({id: newUser._id});

            //return newUser;

            return {token};
        }
        else{
          // console.log("USer already exist in DB");
          return {message:" user already exists"};
        }

        
    }

    async loginUser(userName: string, userPassword: string): Promise<{token: string}>{
        const user = await this.userloginModel.findOne({userName: userName});
        if(!user){
            throw new UnauthorizedException('Invalid UserName');
        }
        const isPasswordValid = await bcrypt.compare(userPassword,user.userPassword);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid Password');
        }
        const token =  this.jwtservice.sign({id: user._id});

        return {token}
        
    }

}

