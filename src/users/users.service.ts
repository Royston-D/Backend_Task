import { Injectable } from '@nestjs/common';
import { UserLogin } from './schemas/user-login.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(UserLogin.name)
        private userloginModel : mongoose.Model<UserLogin>
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
    async create(newuser: UserLogin): Promise<UserLogin | undefined >{

        const checkDB = await this.userloginModel.findOne({userName: newuser.userName});

        if(!checkDB){
            const newUser = await this.userloginModel.create(newuser);
            //console.log("New User Created");
            return newUser;
        }
        else{
          // console.log("USer already exist in DB");
          return null;
        }

        
    }

}
